const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    if (!chatId.endsWith("@g.us")) return reply(sock, chatId, "❌ Groups only.", message);
    const meta = await sock.groupMetadata(chatId);
    const admins = meta.participants.filter(p=>p.admin).length;
    await reply(sock, chatId, `╔═══════════════════════════╗\n║  📋  *GROUP INFO*         ║\n╚═══════════════════════════╝\n\n🏷️ *Name:* ${meta.subject}\n👥 *Total:* ${meta.participants.length}\n⭐ *Admins:* ${admins}\n👤 *Members:* ${meta.participants.length-admins}\n💬 *Chat:* ${meta.announce?"Admins only":"Everyone"}\n📅 *Created:* ${new Date(meta.creation*1000).toDateString()}\n\n📝 ${meta.desc?.trim().slice(0,150)||"No description"}`, message);
};