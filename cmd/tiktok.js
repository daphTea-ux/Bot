module.exports = async function tiktok(tg, chatId, text) {
  const url = text.replace(/^\/(tt|tiktok)\s*/i, "").trim()

  if (!url) {
    return tg("sendMessage", {
      chat_id: chatId,
      text: "Contoh: /tt https://vt.tiktok.com/xxxx"
    })
  }

  const wait = await tg("sendMessage", {
    chat_id: chatId,
    text: "⏳ Processing TikTok..."
  })

  const messageId = wait.result?.message_id

  try {
    const api = `https://api.fvckers.my.id/api/download/tiktok?url=${encodeURIComponent(url)}&apikey=FVCKX`
    const res = await fetch(api)
    const json = await res.json()

    if (!json.status || !json.result) {
      return tg("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: "❌ Gagal mengambil data TikTok."
      })
    }

    const r = json.result

    await tg("deleteMessage", {
      chat_id: chatId,
      message_id: messageId
    })

    const title = (r.title || "TikTok Downloader").slice(0, 900)

    if (r.type === "photo" && Array.isArray(r.photos) && r.photos.length) {
  const media = r.photos.slice(0, 10).map((p, i) => ({
    type: "photo",
    media: p.url || p.image,
    ...(i === 0 && {
      caption: `📸 TikTok Photo\n${title}`
    })
  }))

  await tg("sendMediaGroup", {
    chat_id: chatId,
    media
  })
} else {
      const videoUrl = r.video?.hd || r.video?.nowm || r.video?.wm

      if (videoUrl) {
        await tg("sendVideo", {
          chat_id: chatId,
          video: videoUrl,
          caption: `🎬 TikTok Video\n${title}`
        })
      }
    }

    if (r.audio) {
      await tg("sendAudio", {
        chat_id: chatId,
        audio: r.audio,
        title: "TikTok Audio",
        performer: "TikTok",
        caption: "🎵 TikTok Audio"
      })
    }

  } catch (e) {
    await tg("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: `❌ ${e.message}`
    })
  }
}