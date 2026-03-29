const { reply, getSender, getIsOwner } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const sender = getSender(sock, message);
    if (!await getIsOwner(sock)(sender, sock, chatId)) return reply(sock, chatId, "❌ Owner only.", message);
    const link = args[0]?.trim(); if (!link) return reply(sock, chatId, "❌ Usage: .join <link>", message);
    try { const code=link.includes("chat.whatsapp.com/")?link.split("chat.whatsapp.com/")[1].split("?")[0]:link; await sock.groupAcceptInvite(code); await reply(sock, chatId, "✅ Joined!", message); }
    catch { await reply(sock, chatId, "❌ Failed. Link may be invalid.", message); }
};