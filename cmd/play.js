module.exports = async function play(tg, chatId, text) {
  const query = text.replace(/^\/play\s*/i, "").trim()

  if (!query) {
    return tg("sendMessage", {
      chat_id: chatId,
      text: "Contoh: /play Serena breakbeat"
    })
  }

  const searching = await tg("sendMessage", {
    chat_id: chatId,
    text: "🔎 Searching music..."
  })

  const messageId = searching.result?.message_id

  try {
    const api = `https://api.fvckers.my.id/api/download/ytplay?query=${encodeURIComponent(query)}&apikey=FVCKX`
    const res = await fetch(api)
    const json = await res.json()

    if (!json.status || !json.result?.download_url) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: "❌ Lagu tidak ditemukan / API error."
      })
    }

    const r = json.result

    await tg("deleteMessage", {
      chat_id: chatId,
      message_id: messageId
    })

    const duration = String(r.duration || "0")
      .split(":")
      .map(Number)
      .reduce((a, b) => a * 60 + b, 0)

    const sent = await tg("sendAudio", {
      chat_id: chatId,
      audio: r.download_url,
      title: r.title,
      performer: r.channel,
      duration,
      caption: `
🎵 ${r.title}

👤 Channel : ${r.channel}
⏱ Duration : ${r.duration}
🎧 Quality : ${r.quality}
💾 Size : ${r.size}
`.trim(),
      reply_markup: {
        inline_keyboard: [
          [{ text: "[ Video ]", url: r.url }]
        ]
      }
    })

    if (!sent.ok) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: `❌ Gagal kirim audio:\n${sent.description || "Unknown error"}`
      })
    }

  } catch (e) {
    await tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: `❌ ${e.message}`
    })
  }
}