const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const url = args[0]?.trim(); if (!url||!url.includes("instagram")) return reply(sock, chatId, "❌ Usage: .instagram <url>", message);
    await reply(sock, chatId, "📸 Downloading Instagram...", message);
    try {
        const r = await axios.get(`https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index?url=${encodeURIComponent(url)}`,
            { headers: { "x-rapidapi-host": "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com", "x-rapidapi-key": "demo" }, timeout: 15000 });
        if (!r.data?.media) return reply(sock, chatId, "❌ Could not download. Make sure it is public.", message);
        const media = Array.isArray(r.data.media)?r.data.media[0]:r.data.media;
        const buf = await axios.get(media, { responseType: "arraybuffer", timeout: 30000 });
        await sock.sendMessage(chatId, { video: Buffer.from(buf.data), caption: "📸 Instagram\n\n_skywalker©_" }, { quoted: message });
    } catch { await reply(sock, chatId, "❌ Download failed.", message); }
};