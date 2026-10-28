<div align="center">
  <h1>PIXEL X ULTRA</h1>
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Rockwell&size=45&pause=1000&color=33ff00&center=true&width=800&height=80&lines=Blacklord;Multi+Device+Whatsapp+Bot;Made+by+Blacklord" alt="Typing SVG" />
  </a>
</div>

<div align="center">
  <img src="./assets/pixel.jpg" alt="PIXEL X ULTRA" height="250">
</div>

---

<div align="center">
  <img src="https://readme-typing-svg.demolab.com/?lines=The+bot+supports+deployment;On+all+free+panels+easily" alt="Typing SVG" />
</div>

---

> Quick Actions

<div align="center">

| Action | Link |
|--------|------|
| **Fork Repository** | <a href="https://github.com/frozenlorddev/pixel-x-ultra/fork"><img src="https://img.shields.io/badge/Fork%20Repo-24292e?style=for-the-badge&logo=github&logoColor=white"/></a> |
| **Download ZIP** | <a href="https://github.com/frozenlorddev/pixel-x-ultra/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Download-2ea043?style=for-the-badge&logo=github&logoColor=white"/></a> |

</div>

---

> 🌐 Deployment Options

<div align="center">

| Platform | Button |
|----------|--------|
| **Heroku** | <a href="https://dashboard.heroku.com/new?template=https://github.com/frozenlorddev/pixel-x-ultra"><img src="https://img.shields.io/badge/Heroku-6762A6?style=for-the-badge&logo=heroku&logoColor=white"/></a> |
| **Railway** | <a href="https://railway.app/new"><img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white"/></a> |
| **Render** | <a href="https://render.com"><img src="https://img.shields.io/badge/Render-0099ff?style=for-the-badge&logo=render&logoColor=white"/></a> |
| **Koyeb (Docker)** | <a href="https://app.koyeb.com/deploy?type=git&repository=github.com/frozenlorddev/pixel-x-ultra&branch=main&builder=dockerfile"><img src="https://img.shields.io/badge/Koyeb-6C4CF1?style=for-the-badge&logo=koyeb&logoColor=white"/></a> |
| **Pterodactyl** | <a href="https://pedrodom.thecortana.tech"><img src="https://img.shields.io/badge/Ptero-0B0D0E?style=for-the-badge&logo=serverfault&logoColor=white"/></a> |

</div>

---

> 🔑 Session & Pairing

<div align="center">

| Method | Button |
|--------|--------|
| **Session ID** | <a href="https://pixel-session-gen.onrender.com"><img src="https://img.shields.io/badge/Session%20ID-1a1a4e?style=for-the-badge&logo=whatsapp&logoColor=white"/></a> |
| **Pair in Terminal** | <a href="https://github.com/frozenlorddev/pixel-x-ultra#quick-start"><img src="https://img.shields.io/badge/Pair%20Code-1a1a4e?style=for-the-badge&logo=whatsapp&logoColor=white"/></a> |

</div>

---

> 💬 Support & Community

<div align="center">

| Platform | Link |
|----------|------|
| **WhatsApp Group** | <a href="https://chat.whatsapp.com/IQHBt0lOLmEK67FFA9fnQU"><img src="https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a> |
| **Issues** | <a href="https://github.com/frozenlorddev/pixel-x-ultra/issues"><img src="https://img.shields.io/badge/Report%20Bug-24292e?style=for-the-badge&logo=github&logoColor=white"/></a> |

</div>

---

<details>
<summary><b>⚡ Quick start</b></summary>

<br>

```bash
git clone https://github.com/frozenlorddev/pixel-x-ultra
cd pixel-x-ultra
npm install
npm start
```

**1. Session string (fastest)** — open the session generator, enter the number in international format, copy the string it prints and start with it:

```bash
SESSION_ID=Pixel~... npm start
```

**2. Pair from the bot itself** — prints an 8-character code for WhatsApp → Linked devices → Link with phone number:

```bash
PHONE_NUMBER=254712345678 npm start
```

**3. Interactive menu** — `npm start`, then `[1]` paste a session ID or `[2]` pair with a phone number.

Once paired, `sessions/main/creds.json` is written and reused. Only pair again if WhatsApp unlinks the device (401 / logged out). Use a number that is not the one you message the bot from — a bot cannot reply to itself.

</details>

---

<details>
<summary><b>🔒 What ships in this repository</b></summary>

<br>

This is the packaged build: the bot logic lives in `pixel.bin`, an AES-256-GCM
blob that `index.js` decrypts in memory after verifying its SHA-256. Nothing in
the repository is plaintext source, and the bundle is never written to disk.

Editable on purpose:

| File | Holds |
|------|-------|
| `settings.js` | bot name, owner name, prefix, AI keys — every value falls back to env |
| `database/` | menu list, stickers, per-chat toggles |
| `pixel/database/` | artwork and seed data |
| `.env` | `SESSION_ID`, `PHONE_NUMBER`, `PORT` |

```bash
npm run doctor     # verify the bundle hash, data files and pairing state
```

A corrupted or truncated `pixel.bin` stops with an integrity error instead of
running half a bot — re-download the release if that happens.

</details>

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/frozenlorddev">Blacklord</a></sub>
</div>
