const { reply } = require("./_helper");
const answers = ["✅ Yes!","❌ No!","🤔 Maybe...","💯 Definitely!","🚫 No way!","⚡ Ask again later","🌌 The Force says yes","💀 The Force says no"];
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim(); if (!q) return reply(sock, chatId, "❌ Usage: .8ball <question>", message);
    await reply(sock, chatId, `🎱 *8Ball*\n━━━━━━━━━━\n❓ ${q}\n\n${answers[Math.floor(Math.random()*answers.length)]}`, message);
};