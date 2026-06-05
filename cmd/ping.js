module.exports = async function ping(tg, chatId) {
  const uptime = process.uptime()

  const memory = process.memoryUsage()
  const ramUsed = (memory.rss / 1024 / 1024).toFixed(2)
  const heapUsed = (memory.heapUsed / 1024 / 1024).toFixed(2)
  const heapTotal = (memory.heapTotal / 1024 / 1024).toFixed(2)

  const speed = Date.now()

  await tg("sendMessage", {
    chat_id: chatId,
    parse_mode: "HTML",
    text: `
<pre>╭━━━〔 🏓 SYSTEM STATUS 〕━━━⬣
┃
┣ ⚡ Speed     : ${Date.now() - speed} ms
┣ 🤖 Bot       : Online
┣ 🌐 Server    : Vercel
┣ 📡 Status    : Stable
┃
┣ ⏱ Runtime   : ${Math.floor(uptime)} sec
┣ 🟢 NodeJS    : ${process.version}
┣ 📍 Region    : ${process.env.VERCEL_REGION || "Unknown"}
┃
┣ 💾 RAM Used  : ${ramUsed} MB
┣ 🧠 Heap Used : ${heapUsed} MB
┣ 📦 Heap Total: ${heapTotal} MB
┃
╰━━━━━━━━━━━━━━━━━━⬣</pre>
`.trim()
  })
}