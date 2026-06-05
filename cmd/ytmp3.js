module.exports = async function ytmp3(tg, chatId, text) {
  const url = text.replace(/^\/ytmp3\s*/i, "").trim()

  if (!url) {
    return tg("sendMessage", {
      chat_id: chatId,
      text: "Contoh:\n/ytmp3 https://youtube.com/watch?v=xxxx"
    })
  }

  const wait = await tg("sendMessage", {
    chat_id: chatId,
    text: "🎵 Processing YouTube MP3..."
  })

  const messageId = wait.result?.message_id

  try {
    const api = `https://api.fvckers.my.id/api/download/ytmp3?url=${encodeURIComponent(url)}&apikey=FVCKX`

    const res = await fetch(api)
    const json = await res.json()

    if (!json.status || !json.result?.download_url) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: "❌ Gagal mengambil audio."
      })
    }

    const r = json.result

    await tg("deleteMessage", {
      chat_id: chatId,
      message_id: messageId
    })

    await tg("sendAudio", {
      chat_id: chatId,
      audio: r.download_url,
      title: r.title,
      performer: r.channel,
      caption: `
🎵 ${r.title}

👤 Channel : ${r.channel}
⏱ Duration : ${r.duration}
🎧 Quality : ${r.quality}
💾 Size : ${r.size}
`.trim(),
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "[ Video ]",
              url: r.url
            }
          ]
        ]
      }
    })

  } catch (e) {
    await tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: `❌ ${e.message}`
    })
  }
}