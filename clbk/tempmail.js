global.tempMailSessions = global.tempMailSessions || {}

module.exports = async function tempmailCallback(tg, cb) {
  const chatId = cb.message.chat.id
  const messageId = cb.message.message_id
  const userId = String(cb.from.id)

  const session = global.tempMailSessions[userId]

  if (!session) {
    return tg("answerCallbackQuery", {
      callback_query_id: cb.id,
      text: "Session tempmail tidak ditemukan."
    })
  }

  const data = cb.data

  if (data === "tm_inbox") {
    const res = await fetch(
      `https://api.fvckers.my.id/api/tools/tempmail/inboxv2?visitor_id=${session.visitor_id}&apikey=FVCKX`
    )

    const json = await res.json()

    if (!json.status) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: "❌ Gagal mengambil inbox."
      })
    }

    const mails = json.result.messages || []

    if (!mails.length) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: `📭 Inbox kosong\n\n${session.address}`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔄 Refresh",
                callback_data: "tm_inbox"
              }
            ]
          ]
        }
      })
    }

    const keyboard = mails
      .slice(0, 20)
      .map(mail => [
        {
          text: `${mail.subject}`.slice(0, 40),
          callback_data: `tm_read_${mail.id}`
        }
      ])

    keyboard.push([
      {
        text: "🔄 Refresh",
        callback_data: "tm_inbox"
      }
    ])

    return tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: `📥 Inbox\n\nEmail: ${session.address}\nTotal: ${mails.length}`,
      reply_markup: {
        inline_keyboard: keyboard
      }
    })
  }

  if (data.startsWith("tm_read_")) {
    const id = data.replace("tm_read_", "")

    const res = await fetch(
      `https://api.fvckers.my.id/api/tools/tempmail/readv2?visitor_id=${session.visitor_id}&id=${id}&apikey=FVCKX`
    )

    const json = await res.json()

    if (!json.status) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: "❌ Gagal membaca email."
      })
    }

    const r = json.result

    const content =
      (r.text || r.preview || "No Content")
        .replace(/<[^>]+>/g, "")
        .slice(0, 3500)

    return tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML",
      text: `
📨 <b>${r.subject}</b>

👤 From:
${r.from_address || r.from}

📅 Date:
${r.date}

━━━━━━━━━━━━━━

${content}
`.trim(),
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "⬅ Back Inbox",
              callback_data: "tm_inbox"
            }
          ]
        ]
      }
    })
  }
}