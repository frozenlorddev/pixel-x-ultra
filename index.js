#!/usr/bin/env node
'use strict';
// Pixel X Ultra — launcher.
// The bot itself lives in pixel.bin; this file only opens it. Nothing here is
// part of the bot, and there is nothing in it worth reading: no commands, no
// engine, no keys.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const Module = require('module');

const ROOT = __dirname;
const die = (m) => {
  console.error('[Pixel X Ultra] ' + m);
  process.exit(1);
};

let pkg = {};
try {
  pkg = require(path.join(ROOT, 'package.json'));
} catch {}

let blob;
try {
  blob = fs.readFileSync(path.join(ROOT, 'pixel.bin'));
} catch {
  die('pixel.bin is missing — re-download the release');
}

const want = pkg.pixel && pkg.pixel.sha256;
if (want) {
  const got = crypto.createHash('sha256').update(blob).digest('hex');
  if (got !== want) die('pixel.bin failed its integrity check — re-download the release');
}

const k1 = process.env.PIXEL_K1 || 'c48228d2017ba7fc33640eb1a090828a';
const k2 = (pkg.pixel && pkg.pixel.k2) || '';
if (!k2) die('package.json is incomplete (pixel.k2)');

let payload;
try {
  const iv = blob.subarray(0, 12);
  const tag = blob.subarray(12, 28);
  const body = blob.subarray(28);
  const d = crypto.createDecipheriv('aes-256-gcm', Buffer.from(k1 + k2, 'hex'), iv);
  d.setAuthTag(tag);
  payload = JSON.parse(zlib.gunzipSync(Buffer.concat([d.update(body), d.final()])).toString('utf8'));
} catch (err) {
  die('pixel.bin could not be opened: ' + (err && err.message ? err.message : err));
}

global.__PIXEL_BUNDLE = payload.files;
global.__PIXEL_ROOT = ROOT;

try {
  const mod = { exports: {} };
  const fn = new Function('require', 'module', 'exports', '__dirname', '__filename', payload.entry);
  fn(Module.createRequire(path.join(ROOT, 'index.js')), mod, mod.exports, ROOT, path.join(ROOT, 'index.js'));
} catch (err) {
  die(err && err.message ? err.message : String(err));
}
