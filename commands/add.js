const { checkAdmin, checkBotAdmin, reply, SIG } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    if (!chatId.endsWith("@g.us")) return reply(sock, chatId, "❌ Groups only.", message);
    if (!await checkAdmin(sock, chatId, message)) return reply(sock, chatId, "❌ Admins only.", message);
    if (!await checkBotAdmin(sock, chatId)) return reply(sock, chatId, "❌ Make me admin first.", message);
    const num = args[0]?.replace(/[^0-9]/g,""); if (!num) return reply(sock, chatId, "❌ Usage: .add <number>", message);
    try {
        await sock.groupParticipantsUpdate(chatId, [num+"@s.whatsapp.net"], "add");
        await reply(sock, chatId, `✅ +${num} added!`, message);
    } catch { await reply(sock, chatId, `❌ Could not add +${num}.`, message); }
};