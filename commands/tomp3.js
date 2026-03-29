const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { execSync } = require("child_process");
const { reply } = require("./_helper");
const fs = require("fs"), path = require("path");
module.exports = async (sock, chatId, message) => {
    try {
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage || message.message;
        const vidMsg = quoted?.videoMessage||quoted?.audioMessage; if (!vidMsg) return reply(sock, chatId, "❌ Reply to a video/audio with .tomp3", message);
        await reply(sock, chatId, "🎵 Converting...", message);
        const type = quoted?.videoMessage?"video":"audio";
        const stream = await downloadContentFromMessage(vidMsg, type);
        const chunks = []; for await (const c of stream) chunks.push(c);
        const tmpIn=path.join("./temp",`in_${Date.now()}`), tmpOut=path.join("./temp",`out_${Date.now()}.mp3`);
        fs.writeFileSync(tmpIn, Buffer.concat(chunks));
        execSync(`ffmpeg -i "${tmpIn}" -vn -acodec mp3 -q:a 2 "${tmpOut}" -y`);
        await sock.sendMessage(chatId, { audio: fs.readFileSync(tmpOut), mimetype: "audio/mpeg", fileName: "audio.mp3" }, { quoted: message });
        try{fs.unlinkSync(tmpIn);fs.unlinkSync(tmpOut);}catch{}
    } catch { await reply(sock, chatId, "❌ Conversion failed.", message); }
};