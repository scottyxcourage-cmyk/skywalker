const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const text = args.join(" ").trim(); if (!text) return reply(sock, chatId, "❌ Usage: .qr <text>", message);
    try {
        const r = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`, { responseType: "arraybuffer", timeout: 10000 });
        await sock.sendMessage(chatId, { image: Buffer.from(r.data), caption: `🔲 *QR Code*\n_${text}_\n\n_skywalker©_` }, { quoted: message });
    } catch { await reply(sock, chatId, "❌ Failed to generate QR.", message); }
};