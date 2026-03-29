const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim(); if (!q) return reply(sock, chatId, "❌ Usage: .pin <query>", message);
    await reply(sock, chatId, `📌 *Pinterest: ${q}*\n\nSearch on Pinterest app for best results:\n📱 pinterest.com/search/pins/?q=${encodeURIComponent(q)}`, message);
};