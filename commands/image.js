const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim(); if (!q) return reply(sock, chatId, "❌ Usage: .image <query>", message);
    try {
        const r = await axios.get(`https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`, { responseType: "arraybuffer", timeout: 15000 });
        await sock.sendMessage(chatId, { image: Buffer.from(r.data), caption: `🖼️ *${q}*\n\n_skywalker©_` }, { quoted: message });
    } catch { await reply(sock, chatId, "❌ Image not found.", message); }
};