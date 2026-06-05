async function sReact(msg, emoji) {
  try {
    await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setMessageReaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: msg.chat.id,
          message_id: msg.message_id,
          reaction: [
            {
              type: "emoji",
              emoji
            }
          ]
        })
      }
    )
  } catch (e) {
    console.log("Reaction Error:", e.message)
  }
}

module.exports = sReact