const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim(); if (!q) return reply(sock, chatId, "❌ Usage: .imdb <movie name>", message);
    try {
        const r = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(q)}&apikey=trilogy`, { timeout: 10000 });
        if (r.data.Response==="False") return reply(sock, chatId, `❌ *${q}* not found.`, message);
        const m=r.data;
        await reply(sock, chatId, `🎬 *${m.Title}* (${m.Year})\n━━━━━━━━━━\n⭐ *${m.imdbRating}/10*\n🏆 ${m.Genre}\n⏱️ ${m.Runtime}\n🎭 ${m.Director}\n👥 ${m.Actors}\n\n📝 ${m.Plot}`, message);
    } catch { await reply(sock, chatId, "❌ IMDB search failed.", message); }
};