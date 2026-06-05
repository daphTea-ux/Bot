module.exports = async function menu(tg, chatId, msg) {
  const username = msg.from?.username
    ? `@${msg.from.username}`
    : msg.from?.first_name || chatId

  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)

  const waktuRunPanel = `${hours}h ${minutes}m ${seconds}s`

  await tg("sendPhoto", {
    chat_id: chatId,
    photo: "https://upload.fvckers.my.id/v87ibamprccf46.jpg",
    parse_mode: "HTML",
    caption: `<blockquote>(🐉) Hy ${username}...</blockquote>
<pre>⾼ 𝐒𝐏𝐄𝐒𝐈𝐅𝐈𝐗 𝐄𝐗𝐓𝐄𝐑𝐍𝐀𝐋 ᝄ
╾────────────────╼
▢ Developer: Swiper Fvck
▢ Version: Latest
▢ Platform: Telegram
▢ Online: ${waktuRunPanel}
   ⌜ M⋀ЯG⋀ ϟ ŦVϾК ⌟
╾────────────────╼

I am Fvckers Botz create panel via Telegram, created by @SwiperFvck2. Enjoy using the bot. Thank You.</pre>

<blockquote>↯ 𝙿𝚁𝙴𝚂𝚂 𝚃𝙷𝙴 𝙱𝚄𝚃𝚃𝙾𝙽 𝙱𝙴𝙻𝙾𝚆 ↯</blockquote>`,
    reply_markup: {
      inline_keyboard: [
        [{ text: "[ Show All ]", callback_data: "all_menu" }],
        [{ text: "[ Portofolio ]", url: "https://swiper.my.id" }],
        [{ text: "[ Apis ]", url: "https://api.fvckers.my.id" }]
      ]
    }
  })
}