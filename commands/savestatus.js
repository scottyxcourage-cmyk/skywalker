const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { reply, getSender } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const ctx=message.message?.extendedTextMessage?.contextInfo;
        const quoted=ctx?.quotedMessage; if (!quoted) return reply(sock, chatId, "❌ Reply to a status with .savestatus", message);
        const imgMsg=quoted?.imageMessage, vidMsg=quoted?.videoMessage;
        const txtMsg=quoted?.conversation||quoted?.extendedTextMessage?.text;
        const sender=getSender(sock, message);
        if (txtMsg) { await sock.sendMessage(sender,{text:`📝 *Saved Status*\n\n${txtMsg}\n\n_skywalker©_`}); return reply(sock, chatId, "✅ Text status saved to DM!", message); }
        if (!imgMsg&&!vidMsg) return reply(sock, chatId, "❌ No media found.", message);
        const type=imgMsg?"image":"video";
        const stream=await downloadContentFromMessage(imgMsg||vidMsg,type);
        const chunks=[]; for await(const c of stream) chunks.push(c);
        if (type==="image") await sock.sendMessage(sender,{image:Buffer.concat(chunks),caption:"✅ Saved Status\n\n_skywalker©_"});
        else await sock.sendMessage(sender,{video:Buffer.concat(chunks),caption:"✅ Saved Status\n\n_skywalker©_"});
        await reply(sock, chatId, `✅ Status saved to your DM!`, message);
    } catch { await reply(sock, chatId, "❌ Failed.", message); }
};