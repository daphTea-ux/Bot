async function getFileUrl(fileId) {
  const token = process.env.BOT_TOKEN

  const res = await fetch(`https://api.telegram.org/bot${token}/getFile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_id: fileId })
  })

  const json = await res.json()
  if (!json.ok) throw new Error(json.description || "Gagal getFile")

  return `https://api.telegram.org/file/bot${token}/${json.result.file_path}`
}

module.exports = async function upscaleCallback(tg, cb) {
  const chatId = cb.message.chat.id
  const messageId = cb.message.message_id
  const userId = String(cb.from.id)
  const data = cb.data

  global.upscaleSessions = global.upscaleSessions || {}

  const session = global.upscaleSessions[userId]

  if (!session) {
    return tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: "❌ Session upscale tidak ditemukan. Kirim /upscale ulang."
    })
  }

  if (data.startsWith("up_method_")) {
    session.method = data.replace("up_method_", "")

    return tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: `🪄 Method ${session.method} dipilih.\n\nSekarang pilih size:`,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Low", callback_data: "up_size_low" },
            { text: "Medium", callback_data: "up_size_medium" },
            { text: "High", callback_data: "up_size_high" }
          ]
        ]
      }
    })
  }

  if (data.startsWith("up_size_")) {
    session.size = data.replace("up_size_", "")

    await tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: `🪄 Upscaling image...\nMethod: ${session.method}\nSize: ${session.size}`
    })

    try {
      const imageUrl = await getFileUrl(session.fileId)

      const imgRes = await fetch(imageUrl)
      if (!imgRes.ok) {
        throw new Error(`Gagal download image Telegram: ${imgRes.status}`)
      }

      const blob = await imgRes.blob()

      const form = new FormData()
form.append("method", session.method)
form.append("size", session.size)
form.append("image_url", imageUrl)

const apiRes = await fetch(
  "https://api.fvckers.my.id/api/tools/upscalev1?apikey=FVCKX",
  {
    method: "POST",
    body: form
  }
)

      const raw = await apiRes.text()
      let json

      try {
        json = JSON.parse(raw)
      } catch {
        throw new Error(raw.slice(0, 200))
      }

      if (!json.status || !json.result?.image_url) {
        throw new Error(json.message || json.error || "Upscale gagal")
      }

      await tg("deleteMessage", {
        chat_id: chatId,
        message_id: messageId
      })

      await tg("sendPhoto", {
        chat_id: chatId,
        photo: json.result.image_url,
        caption: `✅ Image Upscaled\n\nMethod: ${session.method}\nSize: ${session.size}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: "[ Open Image ]", url: json.result.image_url }]
          ]
        }
      })

      delete global.upscaleSessions[userId]
    } catch (e) {
      await tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: `❌ ${e.message}`
      })
    }
  }
}