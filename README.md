# Pixel X Ultra — single user

One WhatsApp account, one process. Runs on a Pterodactyl panel, a VPS, Railway,
Render, Koyeb or anything that can keep a Node process alive. Node.js 20+.

This is the current build (3.0.0). The previous `index.js` / `Pixel.js` layout
(v1.2.1) is preserved on the `backup/v1.2.1` branch and the `v1.2.1-pre-v3` tag.

## What's in here

| Path | Purpose |
|---|---|
| `console.js` | Entry point. Numbered login menu, session/pairing handling, reconnect loop, optional health server. |
| `case.js` | Message router: owner checks, prefix handling, anti-delete, chatbot hooks. |
| `pixel/engine.js` | The command engine — 711 command cases, group guards, anti-link/anti-call, status tools. |
| `pixel/config.js` | Engine defaults (`global.prefix`, `global.botname`, …). |
| `pixel/lib/` | Engine support modules: Baileys wiring, menu, endpoints, converters, uploaders, command index. |
| `pixel/database/` | Menu list, seed files, bundled artwork. |
| `helper/` | Listeners, group-admin helpers, logger, scope, uploader, welcome image. |
| `settings.js` | Bot name, owner, prefix, AI keys. Ships empty — fill it in or use env. |
| `console-log.js` | Coloured banner, boxes and log lines. |

Data is per account under `database/accounts/<number>/`; credentials live in
`sessions/main/creds.json`. Both are gitignored.

## Run it

```bash
npm install
npm start
```

First start with no session shows the login menu:

1. **Paste a session ID** — a session string from a pairing generator.
2. **Pair with a phone number** — type the number, get an 8-character code, then
   enter it in WhatsApp → Linked devices → Link with phone number.

For hosts with no terminal (panels that restart on their own, cloud workers),
set env instead of typing:

```bash
SESSION_ID=Pixel!eyJ...     # start already connected
PHONE_NUMBER=254712345678   # mint a pairing code at boot, prints in the log
OWNER_NUMBER=254712345678   # who can run owner commands (defaults to the bot number)
PREFIX=.                    # command prefix
PORT=8080                   # optional: serve GET / as a health check
```

`settings.js` reads the same values from env, so nothing has to be committed.
Optional keys: `BOT_NAME`, `OWNER_NAME`, `SUDO_NUMBER`, `GEMINI_API_KEY`,
`OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `REQUIRED_CHANNEL`, `REQUIRED_GROUP`.

## Deployment notes

- **Pterodactyl / VPS** — `npm install && npm start`, then use the menu. Keep the
  console attached so you can read the pairing code.
- **Render / Koyeb / Railway** — use the worker (background) service type, or set
  `PORT` and use a web service; `render.yaml` is set up as a worker.
- **Heroku** — `app.json` describes a `worker` dyno.
- Credentials survive restarts. A restart only asks you to pair again if WhatsApp
  logged the device out (401), in which case the log says so.

## Commands worth knowing

```
.menu            everything
.setprefix <x>   change the prefix to any word, number or emoji
.prefixfree on   run commands with no prefix at all
.setstick <cmd>  reply to a sticker to bind it to a command
.checkban <num>  is that number on WhatsApp / banned
.settings        boxed read-out of every toggle
```

## License

MIT — see `LICENSE`.
