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
  BOT_VERSION: '3.0.0',

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

  // ── Auto actions on connect ──────────────────────────────
  AUTO_FOLLOW_NEWSLETTERS: false,
  AUTO_JOIN_GROUPS: false,
};
