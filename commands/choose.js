const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    if (!args.length) return reply(sock, chatId, "❌ Usage: .choose option1 option2 option3", message);
    const choice = args[Math.floor(Math.random()*args.length)];
    await reply(sock, chatId, `🎯 *Choice*\n\nI choose: *${choice}*`, message);
};