const fs = require("fs");
const axios = require("axios");
const { checkAdmin, reply, getSender, getIsOwner } = require("./_helper");
const FILE = "./data/chatbot.json";
function get() { try { return JSON.parse(fs.readFileSync(FILE,"utf8")); } catch { return { groups:{}, dms:false }; } }
function save(d) { try { fs.writeFileSync(FILE, JSON.stringify(d,null,2)); } catch {} }

async function chatbotCommand(sock, chatId, message, args) {
    const isGroup = chatId.endsWith("@g.us");
    const sender = getSender(sock, message);
    const isOwner = getIsOwner(sock);
    const d = get(), sub = args[0]?.toLowerCase();
    if (!sub) {
        const dmStatus = d.dms?"✅ ON":"❌ OFF";
        const grpStatus = isGroup?(d.groups[chatId]?"✅ ON":"❌ OFF"):"N/A";
        return reply(sock, chatId, `🤖 *Chatbot Settings*\n━━━━━━━━━━━━━━━\n💬 DMs: *${dmStatus}*\n👥 Group: *${grpStatus}*\n\n.chatbot on/off\n.chatbot dm on/off`, message);
    }
    if (sub==="dm") {
        if (!await isOwner(sender, sock, chatId)) return reply(sock, chatId, "❌ Owner only.", message);
        const action = args[1]?.toLowerCase();
        if (action==="on")  { d.dms=true;  save(d); return reply(sock, chatId, "✅ Chatbot enabled for all DMs!", message); }
        if (action==="off") { d.dms=false; save(d); return reply(sock, chatId, "❌ Chatbot disabled for DMs.", message); }
        return reply(sock, chatId, "❌ Usage: .chatbot dm on/off", message);
    }
    if (!isGroup) return reply(sock, chatId, "❌ Use .chatbot dm on for DMs.", message);
    if (!await checkAdmin(sock, chatId, message)) return reply(sock, chatId, "❌ Admins only.", message);
    if (sub==="on")  { d.groups[chatId]=true;  save(d); return reply(sock, chatId, "🤖 Chatbot *enabled!*", message); }
    if (sub==="off") { d.groups[chatId]=false; save(d); return reply(sock, chatId, "❌ Chatbot *disabled.*", message); }
}

async function handleChatbot(sock, chatId, message, text) {
    try {
        if (!text||text.startsWith(".")||message.key.fromMe) return;
        const isGroup = chatId.endsWith("@g.us"), d = get();
        if (isGroup && !d.groups[chatId]) return;
        if (!isGroup && !d.dms) return;
        let answer = null;
        try {
            const res = await axios.post("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
                { inputs: `<s>[INST] You are Skywalker_MD, a helpful WhatsApp assistant. Be friendly and concise. User: ${text} [/INST]`, parameters: { max_new_tokens: 200, temperature: 0.7, return_full_text: false } },
                { headers: { "Content-Type": "application/json" }, timeout: 15000 });
            const raw = Array.isArray(res.data)?res.data[0]?.generated_text:res.data?.generated_text;
            answer = raw?.replace(/<\/?s>/g,"").replace(/\[INST\]|\[\/INST\]/g,"").trim();
        } catch {}
        if (!answer) { try { const r=await axios.post("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",{inputs:text},{headers:{"Content-Type":"application/json"},timeout:10000}); answer=r.data?.generated_text?.trim(); } catch {} }
        if (!answer) return;
        await sock.sendMessage(chatId, { text: answer+"\n\n_skywalker©_" }, { quoted: message });
    } catch {}
}
module.exports = { chatbotCommand, handleChatbot };
