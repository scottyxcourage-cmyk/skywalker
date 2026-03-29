module.exports = async (sock, chatId, message) => {
    const start = Date.now();
    await sock.sendMessage(chatId, { text: "⚡ *Pinging...*" }, { quoted: message });
    const ms = Date.now() - start;
    const bar = ms<100?"🔵 Lightspeed":ms<300?"🟣 Fast":"🔴 Slow";
    await sock.sendMessage(chatId, { text:
`⚡ *Skywalker_MD Ping*
━━━━━━━━━━━━━━━━
🚀 Speed: *${ms}ms*
📶 Status: ${bar}
🌌 Bot: *Online*

_skywalker©_\`
    }, { quoted: message });
};
