const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args[0]?.trim(); if (!q) return reply(sock, chatId, "❌ Usage: .github <user/repo>", message);
    try {
        const r = await axios.get(`https://api.github.com/repos/${q}`, { timeout: 10000 });
        const d=r.data;
        await reply(sock, chatId, `🐙 *${d.full_name}*\n━━━━━━━━━━\n📝 ${d.description||"No description"}\n⭐ ${d.stargazers_count} stars\n🍴 ${d.forks_count} forks\n💻 ${d.language||"N/A"}\n\n🔗 ${d.html_url}`, message);
    } catch { await reply(sock, chatId, "❌ Repo not found.", message); }
};