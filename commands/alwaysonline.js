const fs = require("fs");
const { reply, getSender, getIsOwner } = require("./_helper");
const FILE = "./data/alwaysonline.json";
function get() { try { return JSON.parse(fs.readFileSync(FILE,"utf8")); } catch { return {enabled:false}; } }
function save(d) { try { fs.writeFileSync(FILE, JSON.stringify(d,null,2)); } catch {} }
const ivs = new Map();
async function alwaysOnlineCommand(sock, chatId, message, args) {
    const sender = getSender(sock, message);
    if (!await getIsOwner(sock)(sender, sock, chatId)) return reply(sock, chatId, "❌ Owner only.", message);
    const sub = args[0]?.toLowerCase(), d = get();
    if (!sub) return reply(sock, chatId, `💓 *Always Online*\nStatus: ${d.enabled?"✅ ON":"❌ OFF"}\n\n.alwaysonline on/off`, message);
    if (sub==="on") { save({enabled:true}); initAlwaysOnline(sock); return reply(sock, chatId, "✅ Always online *enabled!*", message); }
    if (sub==="off") { save({enabled:false}); const iv=ivs.get("ao"); if(iv){clearInterval(iv);ivs.delete("ao");} return reply(sock, chatId, "❌ Disabled.", message); }
}
function initAlwaysOnline(sock) {
    const d = get(); if (!d.enabled) return;
    const ex=ivs.get("ao"); if(ex) clearInterval(ex);
    ivs.set("ao", setInterval(async()=>{ try{await sock.sendPresenceUpdate("available");}catch{} }, 4*60*1000));
}
module.exports = { alwaysOnlineCommand, initAlwaysOnline };