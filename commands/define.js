const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const word = args[0]?.trim(); if (!word) return reply(sock, chatId, "❌ Usage: .define <word>", message);
    try {
        const r = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, { timeout: 10000 });
        const d=r.data[0], m=d.meanings[0], def=m.definitions[0];
        let text = `📖 *${d.word}*\n🏷️ ${m.partOfSpeech}\n📝 ${def.definition}`;
        if (def.example) text += `\n💬 _"${def.example}"_`;
        await reply(sock, chatId, text, message);
    } catch { await reply(sock, chatId, `❌ Word *${args[0]}* not found.`, message); }
};