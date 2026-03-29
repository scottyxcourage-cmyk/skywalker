const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const settings = require("../settings");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage || message.message;
        const imgMsg = quoted?.imageMessage, vidMsg = quoted?.videoMessage;
        if (!imgMsg && !vidMsg) return reply(sock, chatId, "❌ Reply to an image or video with .sticker", message);
        const type = imgMsg ? "image" : "video";
        const stream = await downloadContentFromMessage(imgMsg||vidMsg, type);
        const chunks = []; for await (const c of stream) chunks.push(c);
        await sock.sendMessage(chatId, { sticker: Buffer.concat(chunks), packname: settings.packname, author: settings.author }, { quoted: message });
    } catch(e) { await reply(sock, chatId, `❌ Failed: ${e.message}`, message); }
};
