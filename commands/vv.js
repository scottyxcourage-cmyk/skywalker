const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { reply, getSender } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const ctx = message.message?.extendedTextMessage?.contextInfo;
        const quoted = ctx?.quotedMessage;
        if (!quoted) return reply(sock, chatId, "❌ Reply to a view-once message with .vv", message);
        const voMsg = quoted?.viewOnceMessage?.message || quoted?.viewOnceMessageV2?.message || quoted?.viewOnceMessageV2Extension?.message || quoted;
        const imgMsg = voMsg?.imageMessage, vidMsg = voMsg?.videoMessage;
        if (!imgMsg && !vidMsg) return reply(sock, chatId, "❌ Not a view-once media.", message);
        const type = imgMsg ? "image" : "video";
        const stream = await downloadContentFromMessage(imgMsg||vidMsg, type);
        const chunks = []; for await (const c of stream) chunks.push(c);
        const buf = Buffer.concat(chunks);
        if (type==="image") await sock.sendMessage(chatId, { image: buf, caption: "🔓 *View Once Revealed*\n\n_skywalker©_" }, { quoted: message });
        else await sock.sendMessage(chatId, { video: buf, caption: "🔓 *View Once Revealed*\n\n_skywalker©_" }, { quoted: message });
        try {
            const sender = getSender(sock, message);
            const dmCap = `📥 *Saved View Once*\nFrom: @${(ctx?.participant||sender).split("@")[0]}\n\n_skywalker©_`;
            if (type==="image") await sock.sendMessage(sender, { image: buf, caption: dmCap });
            else await sock.sendMessage(sender, { video: buf, caption: dmCap });
        } catch {}
    } catch { await reply(sock, chatId, "❌ Could not reveal. Message may have expired.", message); }
};
