module.exports = async function allMenu(tg, cb) {
  const chatId = cb.message.chat.id
  const messageId = cb.message.message_id
  const username = cb.from?.username
    ? `@${cb.from.username}`
    : cb.from?.first_name || chatId
  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)

  const waktuRunPanel = `${hours}h ${minutes}m ${seconds}s`

  await tg("editMessageCaption", {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: "HTML",
    caption: `<blockquote>(🐉) Hy ${username}...</blockquote>
<pre>⾼ 𝐒𝐏𝐄𝐒𝐈𝐅𝐈𝐗 𝐄𝐗𝐓𝐄𝐑𝐍𝐀𝐋 ᝄ
╾────────────────╼
▢ Developer: Swiper Fvck
▢ Version: Latest
▢ Platform: Telegram
▢ Online: ${waktuRunPanel}
   ⌜ M⋀ЯG⋀ ϟ ŦVϾК ⌟
╾────────────────╼</pre>

<blockquote expandable>╾────────────────╼
[ Downloader ]
▢ /github
▢ /play
▢ /tt
▢ /ytmp3

[ Tools ]
▢ /upscale
▢ /tempmail

[ Owner ]
▢ /status
▢ /runtime
╾────────────────╼</blockquote>

<blockquote>↯ 𝚂𝙴𝙻𝙴𝙲𝚃 𝙼𝙴𝙽𝚄 𝙱𝙴𝙻𝙾𝚆 ↯</blockquote>`,
    reply_markup: {
      inline_keyboard: [
        [{ text: "[ Back ]", callback_data: "back_menu" }],
        [{ text: "[ Portofolio ]", url: "https://swiper.my.id" }],
        [{ text: "[ Apis ]", url: "https://api.fvckers.my.id" }]
      ]
    }
  })
}