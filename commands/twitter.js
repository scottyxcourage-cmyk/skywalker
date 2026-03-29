const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const url = args[0]?.trim(); if (!url||(!url.includes("twitter")&&!url.includes("x.com"))) return reply(sock, chatId, "❌ Usage: .twitter <tweet url>", message);
    await reply(sock, chatId, "🐦 Downloading Twitter/X...", message);
    try {
        const r = await axios.get(`https://twitsave.com/info?url=${encodeURIComponent(url)}`, { timeout: 15000 });
        const match = r.data.match(/https:\/\/video\.twimg\.com[^"]+\.mp4[^"]*/);
        if (!match) return reply(sock, chatId, "❌ No video found.", message);
        const buf = await axios.get(match[0], { responseType: "arraybuffer", timeout: 30000 });
        await sock.sendMessage(chatId, { video: Buffer.from(buf.data), caption: "🐦 Twitter/X Video\n\n_skywalker©_" }, { quoted: message });
    } catch { await reply(sock, chatId, "❌ Download failed.", message); }
};