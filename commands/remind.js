const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const mins = parseInt(args[0]); const text = args.slice(1).join(" ").trim();
    if (!mins||!text) return reply(sock, chatId, "❌ Usage: .remind <minutes> <message>\nExample: .remind 30 Take medicine", message);
    if (mins>1440) return reply(sock, chatId, "❌ Max 1440 minutes (24 hours).", message);
    await reply(sock, chatId, `⏰ Reminder set for *${mins}* minutes!\n📝 *${text}*`, message);
    setTimeout(async () => {
        try { await sock.sendMessage(chatId, { text: `⏰ *REMINDER*\n\n📝 ${text}\n\n_skywalker©_` }); } catch {}
    }, mins * 60 * 1000);
};