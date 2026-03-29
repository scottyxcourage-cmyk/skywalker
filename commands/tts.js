const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const text = args.join(" ").trim(); if (!text) return reply(sock, chatId, "❌ Usage: .tts <text>", message);
    try {
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
        const r = await axios.get(url, { responseType: "arraybuffer", timeout: 10000, headers: { "User-Agent": "Mozilla/5.0" } });
        await sock.sendMessage(chatId, { audio: Buffer.from(r.data), mimetype: "audio/mpeg", ptt: true }, { quoted: message });
    } catch { await reply(sock, chatId, "❌ TTS failed.", message); }
};