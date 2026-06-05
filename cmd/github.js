module.exports = async function github(tg, chatId, text) {
  const url = text.replace(/^\/(github|git)\s*/i, "").trim()

  if (!url) {
    return tg("sendMessage", {
      chat_id: chatId,
      text: "Contoh:\n/github https://github.com/SwipFvck/Fvckers-Whatsapp"
    })
  }

  const wait = await tg("sendMessage", {
    chat_id: chatId,
    text: "📦 Processing GitHub repo..."
  })

  const messageId = wait.result?.message_id

  try {
    const api = `https://api.fvckers.my.id/api/download/github?url=${encodeURIComponent(url)}&apikey=FVCKX`
    const res = await fetch(api)
    const json = await res.json()

    if (!json.status || !json.result?.url) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: "❌ Gagal mengambil repo GitHub."
      })
    }

    const r = json.result

    await tg("sendDocument", {
  chat_id: chatId,
  document: r.url,
  filename: r.repo,
  caption: `
👤 Owner : ${r.owner}
📁 Repo : ${r.repo}
🌿 Branch : ${r.branch}
⭐ Stars : ${r.stars}
🍴 Forks : ${r.forks}
💾 Size : ${r.size}
`.trim()
})

  } catch (e) {
    await tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: `❌ ${e.message}`
    })
  }
}