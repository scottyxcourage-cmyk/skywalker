const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const r = await axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en", { timeout: 10000 });
        await reply(sock, chatId, `🤓 *Random Fact*\n━━━━━━━━━━\n${r.data.text}`, message);
    } catch { await reply(sock, chatId, "🤓 Did you know? Honey never spoils!", message); }
};