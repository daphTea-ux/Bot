global.upscaleSessions = global.upscaleSessions || {}

module.exports = async function upscale(tg, chatId, msg) {
  let fileId = null

  if (msg.reply_to_message?.photo?.length) {
    fileId = msg.reply_to_message.photo.at(-1).file_id
  } else if (msg.photo?.length) {
    fileId = msg.photo.at(-1).file_id
  } else if (msg.reply_to_message?.document?.mime_type?.startsWith("image/")) {
    fileId = msg.reply_to_message.document.file_id
  } else if (msg.document?.mime_type?.startsWith("image/")) {
    fileId = msg.document.file_id
  }

  if (!fileId) {
    return tg("sendMessage", {
      chat_id: chatId,
      text: "Reply gambar atau kirim gambar dengan caption /upscale"
    })
  }

  global.upscaleSessions[String(msg.from.id)] = {
    chatId,
    fileId
  }

  await tg("sendMessage", {
    chat_id: chatId,
    text: "🪄 Pilih method upscale:",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Method 1", callback_data: "up_method_1" },
          { text: "Method 2", callback_data: "up_method_2" }
        ],
        [
          { text: "Method 3", callback_data: "up_method_3" },
          { text: "Method 4", callback_data: "up_method_4" }
        ]
      ]
    }
  })
}