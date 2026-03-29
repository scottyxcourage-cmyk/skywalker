const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const r = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple", { timeout: 10000 });
        const q=r.data.results[0];
        const all=[...q.incorrect_answers, q.correct_answer].sort(()=>Math.random()-0.5);
        let text = `🧠 *Trivia*\n━━━━━━━━━━\n${decodeURIComponent(q.question)}\n\n`;
        ["A","B","C","D"].forEach((l,i) => { text+=`${l}. ${decodeURIComponent(all[i])}\n`; });
        text += `\n_Answer in 30 seconds!_`;
        await reply(sock, chatId, text, message);
        setTimeout(async()=>{ try{await sock.sendMessage(chatId,{text:`✅ Answer: *${decodeURIComponent(q.correct_answer)}*\n\n_skywalker©_`});}catch{} }, 30000);
    } catch { await reply(sock, chatId, "❌ Could not fetch trivia.", message); }
};