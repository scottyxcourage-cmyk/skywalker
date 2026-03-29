const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const r = await axios.get("https://official-joke-api.appspot.com/random_joke", { timeout: 10000 });
        await reply(sock, chatId, `😂 *Joke*\n━━━━━━━━━━\n${r.data.setup}\n\n${r.data.punchline} 😄`, message);
    } catch { await reply(sock, chatId, "😂 Why did the bot fail? Because it had no jokes API! 😅", message); }
};