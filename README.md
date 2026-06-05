# 🤖 FVCKERS Telegram Bot

Bot Telegram berbasis webhook yang berjalan di Vercel menggunakan Telegram Bot API tanpa library tambahan.

## ✨ Features

- /start
- /ping
- /play
- /ytmp3
- /tt /tiktok
- /github
- /upscale
- /tempmail
- Inline Keyboard
- Callback Query Handler
- Message Reaction
- TempMail Inbox Checker
- AI Upscale Image
- Deploy Vercel Ready

---

## 📂 Struktur Folder

```bash
.
├── api/
│   └── bot.js
│
├── cmd/
│   ├── start.js
│   ├── ping.js
│   ├── play.js
│   ├── ytmp3.js
│   ├── tiktok.js
│   ├── github.js
│   ├── upscale.js
│   └── tempmail.js
│
│
├── clbk/
│   ├── allmenu.js
│   ├── backmenu.js
│   ├── upscale.js
│   └── tempmail.js
│
├── lib/
│   └── function.js
│
├── package.json
└── vercel.json
```

---

# 📜 Penjelasan File

## api/bot.js

File utama webhook Telegram.

Fungsi:

- Menerima update Telegram
- Routing command
- Routing callback button
- Menjalankan semua fitur bot

---

## cmd/start.js

Menampilkan menu utama bot.

Fitur:

- Welcome Message
- Inline Button
- Status Runtime

Command:

```text
/start
```

---

## cmd/ping.js

Menampilkan status server.

Informasi:

- Speed
- Runtime
- RAM Usage
- Heap Usage
- NodeJS Version
- Region Vercel

Command:

```text
/ping
```

---

## cmd/play.js

Pencarian musik YouTube.

Menggunakan API:

```text
/api/download/ytplay
```

Command:

```text
/play judul lagu
```

Contoh:

```text
/play Serena Breakbeat
```

---

## cmd/ytmp3.js

Download audio YouTube.

Menggunakan API:

```text
/api/download/ytmp3
```

Command:

```text
/ytmp3 https://youtube.com/watch?v=xxxx
```

---

## cmd/tiktok.js

Download video/foto TikTok.

Menggunakan API:

```text
/api/download/tiktok
```

Command:

```text
/tt url
/tiktok url
```

---

## cmd/github.js

Download repository GitHub ZIP.

Menggunakan API:

```text
/api/download/github
```

Command:

```text
/github https://github.com/user/repo
```

---

## cmd/upscale.js

Upscale gambar HD.

Fitur:

- Reply gambar
- Pilih metode upscale
- Pilih ukuran hasil

Command:

```text
/upscale
/hd
/remini
```

---

## cmd/tempmail.js

Membuat email sementara.

Fitur:

- Create TempMail
- Check Inbox
- Read Email

Command:

```text
/tempmail
```

---

## clbk/allmenu.js

Handler tombol:

```text
Show All
```

---

## clbk/backmenu.js

Handler tombol:

```text
Back Menu
```

---

## clbk/upscale.js

Handler callback untuk:

```text
Method Upscale
Size Upscale
```

---

## clbk/tempmail.js

Handler callback untuk:

```text
Check Inbox
Read Email
```

---

## lib/function.js

Helper function.

Saat ini berisi:

```js
sReact()
```

Untuk memberi reaction emoji pada pesan Telegram.

---

# 🚀 Cara Deploy ke Vercel Sampai Bot Jalan

## 1. Upload Project ke GitHub

Pastikan struktur project sudah seperti ini:

```bash
api/bot.js
cmd/
clbk/
lib/
package.json
vercel.json
```

Lalu push ke GitHub:

```bash
git init
git add .
git commit -m "deploy telegram bot"
git branch -M main
git remote add origin https://github.com/username/nama-repo.git
git push -u origin main
```

---

## 2. Import Project ke Vercel

1. Buka Vercel
2. Klik **Add New Project**
3. Pilih repository bot lu
4. Klik **Import**
5. Framework pilih **Other**
6. Klik **Deploy**

---

## 3. Tambahkan Environment Variables

Masuk ke:

```text
Project Vercel → Settings → Environment Variables
```

Tambahkan:

```env
BOT_TOKEN=token_bot_telegram_lu
OWNER_ID=id_telegram_lu
```

Contoh:

```env
BOT_TOKEN=1234567890:AAxxxxxx
OWNER_ID=123456789
```

Setelah itu klik **Save** lalu redeploy project.

---

## 4. Cek URL Webhook Bot

Kalau deploy berhasil, endpoint bot lu jadi:

```text
https://namaproject.vercel.app/api/bot
```

Coba buka di browser:

```text
https://namaproject.vercel.app/api/bot
```

Kalau muncul seperti:

```json
{
  "status": true,
  "message": "FVCKERS Telegram Bot is running"
}
```

berarti API bot aktif.

---

## 5. Set Webhook Telegram

Ganti bagian ini:

```text
TOKEN_BOT
```

dengan token bot lu, dan ganti URL Vercel lu.

```bash
curl "https://api.telegram.org/botTOKEN_BOT/setWebhook?url=https://namaproject.vercel.app/api/bot"
```

Contoh:

```bash
curl "https://api.telegram.org/bot1234567890:AAxxxx/setWebhook?url=https://fvckers-bot.vercel.app/api/bot"
```

Kalau sukses nanti responnya:

```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

---

## 6. Cek Webhook Aktif

```bash
curl "https://api.telegram.org/botTOKEN_BOT/getWebhookInfo"
```

Kalau sudah benar, bagian `url` harus berisi URL Vercel lu:

```json
{
  "ok": true,
  "result": {
    "url": "https://namaproject.vercel.app/api/bot"
  }
}
```

Kalau ada error di bagian `last_error_message`, berarti webhook belum jalan.

---

## 7. Jalankan Bot

Buka bot lu di Telegram, lalu kirim:

```text
/start
```

Tes juga:

```text
/ping
/menu
/play dj malam pagi
/tempmail
```

Kalau bot membalas, berarti bot sudah berhasil jalan di Vercel.

---

# ⚠️ Fix Jika Bot Tidak Respon

## Cek BOT_TOKEN

Pastikan token benar dari BotFather:

```text
@BotFather
```

Format token harus seperti:

```text
1234567890:AAxxxxxxxxxxxxxxxx
```

---

## Cek Function Logs Vercel

Masuk ke:

```text
Vercel Project → Logs
```

Lalu kirim `/start` ke bot.

Kalau ada error, biasanya muncul di logs.

---

## Hapus Webhook Lama

Kalau sebelumnya pernah deploy di domain lain, hapus webhook dulu:

```bash
curl "https://api.telegram.org/botTOKEN_BOT/deleteWebhook"
```

Lalu set ulang:

```bash
curl "https://api.telegram.org/botTOKEN_BOT/setWebhook?url=https://namaproject.vercel.app/api/bot"
```

---

## Pastikan vercel.json Benar

Contoh `vercel.json`:

```json
{
  "functions": {
    "api/bot.js": {
      "maxDuration": 90
    }
  }
}
```

---

## Pastikan package.json Ada

Contoh minimal:

```json
{
  "name": "FVCKERS",
  "version": "1.0.0",
  "type": "commonjs",
  "dependencies": {
    "axios": "^1.16.1"
  }
}
```

---

# ✅ Bot Siap Dipakai

Kalau semua sudah benar:

```text
GitHub ✅
Vercel Deploy ✅
ENV BOT_TOKEN ✅
Webhook Telegram ✅
Bot Respon ✅
```

Berarti bot lu sudah online 24 jam lewat Vercel.

---

# 📡 API Yang Digunakan

FVCKERS API

```text
https://api.fvckers.my.id
```

Endpoint:

```text
/api/download/ytplay
/api/download/ytmp3
/api/download/tiktok
/api/download/github
/api/tools/tempmail
/api/tools/upscale
```

---

## 👨‍💻 Developer

```text
Swiper Fvck
```

Website:

```text
https://swiper.my.id
```

API:

```text
https://api.fvckers.my.id
```

Telegram:

```text
@swiperfvck
```

## ❤️ Thanks To

| Name | Role |
|--------|--------|
| Swiper Fvck | Developer |
| Dinda Fvck | My Girl |
| Kyuu2nd | My Friend |
| Revinza | My Friend |
| Langitcode | My Friend |
| Al Exploiter | My Friend |
| Fvckers | My Aggency |
| Dark Angel | My Aggency |

---

## License

MIT License

Copyright (c) 2026 Swiper Fvck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
