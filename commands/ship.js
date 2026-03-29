const { getMentioned, reply, getSender } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    const mentioned = getMentioned(message); const sender = getSender(sock, message);
    const p1 = mentioned[0]||sender, p2 = mentioned[1]||sender;
    const pct = Math.floor(Math.random()*101);
    const bar = "❤️".repeat(Math.round(pct/10)) + "🖤".repeat(10-Math.round(pct/10));
    await sock.sendMessage(chatId, { text: `💘 *Ship*\n━━━━━━━━━━\n@${p1.split("@")[0]} ❤️ @${p2.split("@")[0]}\n\n${bar}\n*${pct}% compatible!*\n\n_skywalker©_`, mentions: [p1,p2] }, { quoted: message });
};