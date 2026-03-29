const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    if (args.length < 2) return reply(sock, chatId, "❌ Usage: .translate <lang> <text>\nExample: .translate es Hello", message);
    const lang = args[0].toLowerCase(), text = args.slice(1).join(" ");
    try {
        const r = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`, { timeout: 10000 });
        let out = ""; r.data[0].forEach(c => { if(c[0]) out+=c[0]; });
        await reply(sock, chatId, `🌐 *Translate*\n━━━━━━━━━━\n🔤 Original: ${text}\n✅ ${lang.toUpperCase()}: ${out}`, message);
    } catch { await reply(sock, chatId, "❌ Translation failed.", message); }
};