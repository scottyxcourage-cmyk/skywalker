const isAdminLib = require("../lib/isAdmin");
const { makeIsOwner } = require("../lib/isOwner");
const { getSender, normalizeJid } = require("../lib/getSender");

const SIG = "\n\n_skywalker©_";

function getIsOwner(sock) {
    return makeIsOwner(sock._ownerPhone || process.env.OWNER_NUMBER || "");
}
async function checkAdmin(sock, chatId, message) {
    const sender = getSender(sock, message);
    const isOwner = getIsOwner(sock);
    if (await isOwner(sender, sock, chatId)) return true;
    if (chatId.endsWith("@g.us")) return await isAdminLib(sock, chatId, sender);
    return false;
}
async function checkBotAdmin(sock, chatId) {
    if (!chatId.endsWith("@g.us")) return false;
    return await isAdminLib.isBotAdmin(sock, chatId);
}
function getMentioned(message) {
    const list = [...(message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [])];
    const qp = message.message?.extendedTextMessage?.contextInfo?.participant;
    if (qp && !list.includes(qp)) list.push(qp);
    return list;
}
async function reply(sock, chatId, text, message) {
    return sock.sendMessage(chatId, { text: text + SIG }, message ? { quoted: message } : {});
}
module.exports = { checkAdmin, checkBotAdmin, getMentioned, reply, getSender, getIsOwner, isAdmin: isAdminLib, SIG };
