const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const url = args[0]?.trim();
    if (!url || !url.includes("tiktok")) return reply(sock, chatId, "❌ Usage: .tiktok <url>", message);
    await reply(sock, chatId, "⏳ Downloading TikTok...", message);
    try {
        const r = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`, { timeout: 20000 });
        if (!r.data?.video?.noWatermark) return reply(sock, chatId, "❌ Could not fetch video.", message);
        const buf = await axios.get(r.data.video.noWatermark, { responseType: "arraybuffer", timeout: 30000 });
        await sock.sendMessage(chatId, { video: Buffer.from(buf.data), caption: `🎵 *${r.data.title||"TikTok"}*\n\n_skywalker©_` }, { quoted: message });
    } catch { await reply(sock, chatId, "❌ TikTok download failed.", message); }
};
