const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const r = await axios.get("https://api.quotable.io/random", { timeout: 10000 });
        await reply(sock, chatId, `💬 *Quote*\n━━━━━━━━━━\n_"${r.data.content}"_\n\n— *${r.data.author}*`, message);
    } catch { await reply(sock, chatId, `💬 _"The Force will be with you, always."_\n\n— Obi-Wan Kenobi`, message); }
};