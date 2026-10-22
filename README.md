# Pixel X Ultra

A WhatsApp bot for **one** WhatsApp account. Node.js 20–22, no database server, one
process, ~690 commands behind a `.` prefix.

![Pixel X Ultra](https://raw.githubusercontent.com/frozenlorddev/pixel-x-ultra/main/database/pixelpic.jpg)

> Prefer to be sure? Fork or clone this repo only —
> `github.com/frozenlorddev/pixel-x-ultra`. Session string: **<https://pixel-session-gen.onrender.com>**

---

## Fork and run

1. **Fork** this repo (top right → Fork), or clone it:

```bash
git clone https://github.com/frozenlorddev/pixel-x-ultra
cd pixel-x-ultra
```

2. **Install**:

```bash
npm install
```

3. **Start**:

```bash
npm start
```

First start with no session shows a menu — pick `2` to pair with a phone number.
That's it; credentials are saved in `session/` and reused on every restart.

Hosting it somewhere? Keep `session/` on a persistent disk, or set `SESSION_ID` in
your environment so it re-logs in after a restart. `Procfile` and `.env.example`
cover the common hosts.

---

## Pairing

### 1. Session string (fastest)

1. Open <https://pixel-session-gen.onrender.com>
2. Enter the bot's number in international format, no `+` — e.g. `254712345678`
3. Enter the 8-character code it gives you in
   **WhatsApp → Settings → Linked devices → Link with phone number**
4. Copy the string it prints (starts with `Pixel~`) into `SESSION_ID`

```bash
SESSION_ID=Pixel~... npm start
```

### 2. Pair from the bot itself

```bash
PAIR_PHONE=254712345678 npm start
```

The console prints an 8-character code; enter it in
**Linked devices → Link with phone number**. Best on a panel or any host without a
terminal you can type into.

### 3. Interactive menu

```bash
npm start
```

```
[1] paste a session ID
[2] pair with a phone number
```

Pick `2`, type the number, enter the code. Needs a real terminal — that's why option
2 exists.

Once paired, `session/creds.json` is written and reused. You only pair again if
WhatsApp unlinks the device (`401 device was logged out`).

**Use a number that is not the phone you message the bot from.** A bot cannot reply
to itself.

---

## Commands

Prefix is `.` by default. Send `.menu` — plain `menu` without the dot is ignored.

| Command | What it does |
|---|---|
| `.menu` | The full boxed menu |
| `.fullmenu` / `.menulist` | Every command, flat list |
| `.setprefix <x>` | Change the prefix to any word, number or emoji |
| `.prefixfree on` | Run commands with no prefix at all |
| `.settings` | Boxed read-out of every toggle |
| `.setstick <cmd>` | Reply to a sticker to bind it to a command |
| `.checkban <number>` | Check whether a number is on WhatsApp / banned |
| `.play <song>` | Send an MP3 as a file and as audio |

Commands work in groups and in DMs. Admin-only commands need you to be a group admin
or the bot's owner; owner commands need your number in `database/owner.json`
(digits only, no `+`).

**Bot answers nobody?** Check `database/settings.json` — `"mode"` must be `"public"`.
In `private` mode only the owner gets replies. Change it with `.setmode public`.

---

## Settings

Environment variable or `.env` file:

| Variable | Default | Meaning |
|---|---|---|
| `SESSION_ID` | — | Session string. Skips pairing entirely. |
| `PAIR_PHONE` | — | Number to request a pairing code for at boot. |
| `PORT` | `3000` | HTTP port for the landing page. Hosts usually inject it. |
| `BOT_NAME` | `Pixel X Ultra` | Name in menus and replies. |
| `OWNER_NAME` | `Pixel X Ultra` | Owner name in menus. |
| `PREFIX` | `.` | Command prefix. |
| `LINK` | this repo | Target of the menu's REPO button. |

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Connects but never replies | Message sent without the prefix | Send `.menu` |
| Connects but never replies | You messaged the bot from its own number | Message it from another phone |
| `device was logged out` | Session invalidated | Pair again |
| Silent after a redeploy | `session/` was wiped (ephemeral disk) | Set `SESSION_ID` in env |
| `Stream Errored (conflict)` | Same session open twice | Run one instance per account |
| Only the owner gets replies | `mode` is `private` | `.setmode public` |

---

## License

MIT. See `LICENSE`.
