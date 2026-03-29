const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim()||"world";
    try {
        const r = await axios.get(`https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=3&apikey=demo`, { timeout: 10000 });
        const articles = r.data?.articles||[];
        if (!articles.length) return reply(sock, chatId, `❌ No news for: *${q}*`, message);
        let text = `📰 *News: ${q}*\n━━━━━━━━━━\n\n`;
        articles.forEach((a,i) => { text += `*${i+1}.* ${a.title}\n🔗 ${a.url}\n\n`; });
        await reply(sock, chatId, text, message);
    } catch { await reply(sock, chatId, "❌ News unavailable.", message); }
};