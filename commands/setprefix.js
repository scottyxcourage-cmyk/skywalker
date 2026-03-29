const fs = require("fs");
const { reply, getSender, getIsOwner } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const sender = getSender(sock, message);
    if (!await getIsOwner(sock)(sender, sock, chatId)) return reply(sock, chatId, "❌ Owner only.", message);
    const prefix = args[0]?.trim(); if (!prefix||prefix.length>3) return reply(sock, chatId, "❌ Usage: .setprefix <symbol>", message);
    try {
        let content = fs.readFileSync("./settings.js","utf8");
        content = content.replace(/prefix:\s*"[^"]*"/, `prefix: "${prefix}"`);
        content = content.replace(/prefix:\s*'[^']*'/, `prefix: "${prefix}"`);
        fs.writeFileSync("./settings.js", content);
        await reply(sock, chatId, `✅ Prefix set to: *${prefix}*\n_Restart for full effect._`, message);
    } catch { await reply(sock, chatId, "❌ Failed.", message); }
};