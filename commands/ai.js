const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim();
    if (!q) return reply(sock, chatId, "❌ Usage: .ai <question>", message);
    await sock.sendMessage(chatId, { text: "🌌 *Skywalker AI thinking...*" }, { quoted: message });
    try {
        const res = await axios.post("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            { inputs: `<s>[INST] ${q} [/INST]`, parameters: { max_new_tokens: 300, temperature: 0.7, return_full_text: false } },
            { headers: { "Content-Type": "application/json" }, timeout: 30000 });
        let ans = Array.isArray(res.data) ? res.data[0]?.generated_text : res.data?.generated_text;
        ans = (ans||"No response").replace(/<\/?s>/g,"").replace(/\[INST\]|\[\/INST\]/g,"").trim();
        if (!ans) throw new Error("empty");
        await reply(sock, chatId, `🌌 *Skywalker AI*\n━━━━━━━━━━━━\n❓ ${q}\n\n💬 ${ans}`, message);
    } catch {
        try {
            const r2 = await axios.post("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
                { inputs: q }, { headers: { "Content-Type": "application/json" }, timeout: 15000 });
            const a2 = r2.data?.generated_text?.trim();
            if (a2) return await reply(sock, chatId, `🌌 *Skywalker AI*\n━━━━━━━━━━━━\n❓ ${q}\n\n💬 ${a2}`, message);
        } catch {}
        await reply(sock, chatId, "❌ AI is busy. Try again.", message);
    }
};
