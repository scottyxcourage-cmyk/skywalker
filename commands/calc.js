const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const expr = args.join(" ").trim(); if (!expr) return reply(sock, chatId, "❌ Usage: .calc <expression>\nExample: .calc 2+2", message);
    try {
        const result = Function(`"use strict"; return (${expr})`)();
        await reply(sock, chatId, `🧮 *Calculator*\n━━━━━━━━━━\n📝 ${expr}\n✅ = *${result}*`, message);
    } catch { await reply(sock, chatId, "❌ Invalid expression.", message); }
};