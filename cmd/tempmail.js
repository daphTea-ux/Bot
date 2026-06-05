global.tempMailSessions = global.tempMailSessions || {}

module.exports = async function tempmail(tg, chatId, msg) {
  const res = await fetch(
    "https://api.fvckers.my.id/api/tools/tempmail/createv2?apikey=FVCKX"
  )

  const json = await res.json()

  if (!json.status) {
    return tg("sendMessage", {
      chat_id: chatId,
      text: "❌ Gagal membuat tempmail."
    })
  }

  const r = json.result

  global.tempMailSessions[String(msg.from.id)] = {
    visitor_id: r.visitor_id,
    address: r.address
  }

  await tg("sendMessage", {
    chat_id: chatId,
    parse_mode: "HTML",
    text: `
📧 <b>Temp Mail Created</b>

📮 Address: <code>${r.address}</code>
⏳ Expire: ${r.remaining_hours} Hours
🆔 Visitor ID: <code>${r.visitor_id}</code>
`.trim(),
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📥 Check Inbox",
            callback_data: "tm_inbox"
          }
        ]
      ]
    }
  })
}