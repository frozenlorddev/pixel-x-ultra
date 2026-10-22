"use strict";
/**
 * Pixel X Ultra — entry point.
 *
 *   node index.js            start the bot
 *   node index.js --doctor   check the install and exit
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Module = require("module");

const ROOT = __dirname;
const BIN = path.join(ROOT, "pixel.bin");

const K1 = process.env.PIXEL_K1 || "121c08d496a4beaa74fa00b1934daf30";
const SHA256 = "f8fbfa35a9527315dcf8dcadc37657ae7ca65846f06b4e24d8f6b19c1b52034f";

function decrypt() {
  if (!fs.existsSync(BIN)) {
    throw new Error("pixel.bin is missing — re-download the release.");
  }
  const blob = fs.readFileSync(BIN);
  const actual = crypto.createHash("sha256").update(blob).digest("hex");
  if (actual !== SHA256) {
    throw new Error("pixel.bin failed its integrity check (truncated or modified)");
  }
  const pkg = require(path.join(ROOT, "package.json"));
  const k2 = process.env.PIXEL_K2 || (pkg.pixel && pkg.pixel.k2);
  if (!k2) throw new Error("package.json is missing its pixel block");

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(K1 + k2, "hex"),
    blob.subarray(0, 12),
  );
  decipher.setAuthTag(blob.subarray(12, 28));
  const json = Buffer.concat([decipher.update(blob.subarray(28)), decipher.final()]).toString("utf8");
  return JSON.parse(json);
}

let BUNDLE;
try {
  BUNDLE = decrypt();
} catch (err) {
  console.error("\n✖ " + err.message + "\n");
  process.exit(1);
}

const loaded = new Map();

function keyFor(request, parent) {
  if (typeof request !== "string" || request[0] !== ".") return null;
  const from = parent && parent.filename ? path.dirname(parent.filename) : ROOT;
  const base = path.resolve(from, request);
  const rel = path.relative(ROOT, base).split(path.sep).join("/");
  for (const candidate of [rel, rel + ".js", rel + "/index.js"]) {
    if (Object.prototype.hasOwnProperty.call(BUNDLE, candidate)) return candidate;
  }
  return null;
}

function moduleFor(key) {
  if (loaded.has(key)) return loaded.get(key);
  const filename = path.join(ROOT, key);
  const m = new Module(filename, null);
  m.filename = filename;
  m.paths = Module._nodeModulePaths(path.dirname(filename));
  loaded.set(key, m);
  if (key.endsWith(".json")) {
    m.exports = JSON.parse(BUNDLE[key]);
  } else {
    m._compile(BUNDLE[key], filename);
  }
  m.loaded = true;
  return m;
}

function absoluteKey(request) {
  if (!path.isAbsolute(request)) return null;
  const rel = path.relative(ROOT, request).split(path.sep).join("/");
  for (const candidate of [rel, rel + ".js", rel + "/index.js"]) {
    if (Object.prototype.hasOwnProperty.call(BUNDLE, candidate)) return candidate;
  }
  return null;
}

const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  const key = keyFor(request, parent) || absoluteKey(request);
  if (key) return path.join(ROOT, key);
  return originalResolve.apply(this, arguments);
};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  const key = keyFor(request, parent);
  if (key) return moduleFor(key).exports;
  return originalLoad.apply(this, arguments);
};

try {
  if (BUNDLE["lib/index.html"]) {
    fs.mkdirSync(path.join(ROOT, "lib"), { recursive: true });
    fs.writeFileSync(path.join(ROOT, "lib", "index.html"), BUNDLE["lib/index.html"]);
  }
} catch (_) {
  /* read-only filesystem: the HTTP server falls back to its 404 */
}

if (process.argv.includes("--doctor")) {
  console.log("install        : ok (" + fs.statSync(BIN).size + " bytes, hash verified)");
  for (const rel of ["database/settings.json", "database/menu_list.json", "database/pixelpic.jpg"]) {
    console.log((fs.existsSync(path.join(ROOT, rel)) ? "  ok   " : "  MISS ") + rel);
  }
  console.log(
    "session         : " +
      (fs.existsSync(path.join(ROOT, "session", "creds.json")) ? "paired" : "not paired yet"),
  );
  process.exit(0);
}

const entry = new Module(path.join(ROOT, "index.js"), null);
entry.filename = path.join(ROOT, "index.js");
entry.paths = Module._nodeModulePaths(ROOT);
entry._compile(BUNDLE["index.js"], entry.filename);
