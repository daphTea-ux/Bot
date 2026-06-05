const menu = require("../cmd/start")
const ping = require("../cmd/ping")
const play = require("../cmd/play")
const tiktok = require("../cmd/tiktok")
const ytmp3 = require("../cmd/ytmp3")
const github = require("../cmd/github")
const upscale = require("../cmd/upscale")
const bypass = require("../cmd/bypass")
const tempmail = require("../cmd/tempmail")
//=====================================\\
const sReact = require("../lib/function")
//=====================================\\
const allMenu = require("../clbk/allmenu")
const backMenu = require("../clbk/backmenu")
const upscaleCallback = require("../clbk/upscale")
const tempmailCallback = require("../clbk/tempmail")
//=====================================\\
const TOKEN = process.env.BOT_TOKEN
//=====================================\\
async function tg(method, data) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}
//=====================================\\
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("Telegram Bot Active")
  }
  try {
    const update = req.body

    if (update.callback_query) {
      const cb = update.callback_query
      const data = cb.data

      await tg("answerCallbackQuery", {
        callback_query_id: cb.id
      })

      if (data === "all_menu") {
        await allMenu(tg, cb)
      } else if (data === "back_menu") {
        await backMenu(tg, cb)
      } else if (data.startsWith("up_method_") || data.startsWith("up_size_")) {
        await upscaleCallback(tg, cb)
      } else if (data === "tm_inbox" || data.startsWith("tm_read_")) {
        await tempmailCallback(tg, cb)
      }

      return res.status(200).json({ ok: true })
    }

    const msg = update.message
    if (!msg) return res.status(200).json({ ok: true })

    const chatId = msg.chat.id
    const text = msg.text || ""

    if (text === "/start") {
      await sReact(msg, "⚡")
      await menu(tg, chatId, msg)
    } else if (text === "/ping") {
      await sReact(msg, "⚡")
      await ping(tg, chatId)
    } else if (text.startsWith("/play")) {
      await sReact(msg, "⚡")
      await play(tg, chatId, text)
    } else if (text.startsWith("/tt") || text.startsWith("/tiktok")) {
      await sReact(msg, "⚡")
      await tiktok(tg, chatId, text)
    } else if (text.startsWith("/ytmp3")) {
      await sReact(msg, "⚡")
      await ytmp3(tg, chatId, text)
    } else if (text.startsWith("/github") || text.startsWith("/git")) {
      await sReact(msg, "⚡")
      await github(tg, chatId, text)
    } else if (text === "/upscale" || text === "/hd" || text === "/remini") {
      await sReact(msg, "⚡")
      await upscale(tg, chatId, msg)
    } else if (text === "/tempmail" || text === "/mail" || text === "/tm") {
      await sReact(msg, "⚡")
      await tempmail(tg, chatId, msg)
    }

    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(200).json({ ok: false, message: e.message })
  }
}