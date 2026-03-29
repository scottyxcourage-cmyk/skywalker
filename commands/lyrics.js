const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim(); if (!q) return reply(sock, chatId, "❌ Usage: .lyrics <song name>", message);
    try {
        const r = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(q.replace(" "," / "))}`, { timeout: 10000 });
        if (!r.data?.lyrics) return reply(sock, chatId, `❌ Lyrics not found for: *${q}*`, message);
        const lyrics = r.data.lyrics.slice(0, 3000);
        await reply(sock, chatId, `🎵 *${q}*\n━━━━━━━━━━\n${lyrics}`, message);
    } catch { await reply(sock, chatId, `❌ Lyrics not found for: *${q}*`, message); }
};