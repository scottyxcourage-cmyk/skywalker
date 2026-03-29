const axios = require("axios");
const { getMentioned, reply, getSender } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    try {
        const mentioned = getMentioned(message);
        const target = mentioned[0]||getSender(sock, message);
        let ppUrl; try { ppUrl=await sock.profilePictureUrl(target,"image"); } catch { return reply(sock, chatId, `❌ @${target.split("@")[0]} has no profile picture.`, message); }
        const buf = await axios.get(ppUrl, { responseType: "arraybuffer", timeout: 15000 });
        await sock.sendMessage(chatId, { image: Buffer.from(buf.data), caption: `🖼️ *Profile Picture*\n@${target.split("@")[0]}\n\n_skywalker©_`, mentions:[target] }, { quoted: message });
    } catch { await reply(sock, chatId, "❌ Could not fetch DP.", message); }
};