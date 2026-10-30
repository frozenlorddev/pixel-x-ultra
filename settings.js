'use strict';
// ============================================================
//   settings.js — single-session build
//   Fill in only what you use. No secrets are shipped in this file.
//   Everything can also come from environment variables.
// ============================================================
require('dotenv').config();

module.exports = {
  // ── AI / APIs (optional) ─────────────────────────────────
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',

  // ── Identity ─────────────────────────────────────────────
  OWNER_NAME: process.env.OWNER_NAME || 'Pixel',
  SUDO_NUMBER: process.env.SUDO_NUMBER || '',   // extra owner number, digits only
  BOT_NAME: process.env.BOT_NAME || 'Pixel X Ultra',
  BOT_VERSION: '3.1.2',

  // ── Behaviour ────────────────────────────────────────────
  SESSION_DIR: process.env.SESSION_DIR || './sessions',
  DEFAULT_PREFIX: process.env.PREFIX || '.',
  DEFAULT_MENU_IMG: '',
  READ_STATUS: false,

  // ── Optional gates (leave empty to disable) ──────────────
  REQUIRED_CHANNEL: process.env.REQUIRED_CHANNEL || '',
  REQUIRED_GROUP: process.env.REQUIRED_GROUP || '',
  REQUIRED_CHANNEL_LINK: process.env.REQUIRED_CHANNEL_LINK || '',
  REQUIRED_GROUP_LINK: process.env.REQUIRED_GROUP_LINK || '',
  REQUIRED_CHANNEL_ID: process.env.REQUIRED_CHANNEL_ID || '',
  REQUIRED_GROUP_ID: process.env.REQUIRED_GROUP_ID || '',

  // ── Self-update (.update) ────────────────────────────────
  // Downloads this repo's latest build and writes the changed files over the
  // old ones. sessions/, settings.js and database/ are never touched.
  // Leave commented to auto-detect: the source build pulls pixel-x-ultra-source,
  // the encrypted build pulls pixel-x-ultra.
  // UPDATE_REPO: 'frozenlorddev/pixel-x-ultra-source',
  UPDATE_BRANCH: process.env.UPDATE_BRANCH || 'main',
  UPDATE_RESTART: true,          // exit after updating so the host restarts it
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',   // only needed for a private repo

  // ── Auto actions on connect ──────────────────────────────
  AUTO_FOLLOW_NEWSLETTERS: false,
  AUTO_JOIN_GROUPS: false,
};
