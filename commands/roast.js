const { reply } = require("./_helper");
const roasts = ["You're like a cloud. When you disappear, it's a beautiful day!","I'd agree with you but then we'd both be wrong.","You have your entire life to be an idiot. Why not take today off?","I'd explain it to you but I don't have crayons.","You're proof that evolution can go in reverse."];
module.exports = async (sock, chatId, message) => {
    await reply(sock, chatId, `🔥 *Roast*\n━━━━━━━━━━\n${roasts[Math.floor(Math.random()*roasts.length)]}`, message);
};