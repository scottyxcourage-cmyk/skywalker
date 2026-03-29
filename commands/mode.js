const fs = require("fs");
const { reply, getSender, getIsOwner } = require("./_helper");
const FILE = "./data/mode.json";
function getMode() { try { return JSON.parse(fs.readFileSync(FILE,"utf8")); } catch { return {mode:"public"}; } }
function saveMode(d) { try { fs.writeFileSync(FILE, JSON.stringify(d,null,2)); } catch {} }
async function modeCommand(sock, chatId, message, args) {
    const sender = getSender(sock, message);
    if (!await getIsOwner(sock)(sender, sock, chatId)) return reply(sock, chatId, "❌ Owner only.", message);
    const sub = args[0]?.toLowerCase();
    if (!sub) return reply(sock, chatId, `🌐 *Mode*\nCurrent: *${getMode().mode.toUpperCase()}*\n\n.mode public\n.mode private`, message);
    if (!["public","private"].includes(sub)) return reply(sock, chatId, "❌ Use: .mode public OR .mode private", message);
    saveMode({mode:sub}); sock.public = sub==="public";
    await reply(sock, chatId, `✅ Mode set to *${sub.toUpperCase()}*`, message);
}
module.exports = { modeCommand, getMode };