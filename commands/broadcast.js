const fs = require("fs");
const { reply, getSender, getIsOwner } = require("./_helper");
const FILE = "./data/bc_users.json";
function getUsers() { try { return JSON.parse(fs.readFileSync(FILE,"utf8")); } catch { return []; } }
function addUser(jid) { if (!jid||jid.includes("@g.us")) return; const u=getUsers(); if (!u.includes(jid)){ u.push(jid); try{ fs.writeFileSync(FILE,JSON.stringify(u,null,2)); }catch{} } }
module.exports = async (sock, chatId, message, args) => {
    const sender = getSender(sock, message);
    if (!await getIsOwner(sock)(sender, sock, chatId)) return reply(sock, chatId, "❌ Owner only.", message);
    const text = args.join(" ").trim(), users = getUsers();
    if (!text) return reply(sock, chatId, `📢 *Broadcast*\nUsers: *${users.length}*\n\nUsage: .broadcast <message>`, message);
    if (!users.length) return reply(sock, chatId, "❌ No users tracked yet.", message);
    await reply(sock, chatId, `📤 Broadcasting to *${users.length}* users...`, message);
    let sent=0, fail=0;
    for (const u of users) { try { await sock.sendMessage(u,{text:`📢 *Broadcast*\n\n${text}\n\n_skywalker©_`}); sent++; await new Promise(r=>setTimeout(r,500)); } catch { fail++; } }
    await reply(sock, chatId, `✅ Done! Sent: ${sent} | Failed: ${fail}`, message);
};
module.exports.addUser = addUser;