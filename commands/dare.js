const { reply } = require("./_helper");
const dares = ["Send a voice note singing your favourite song","Change your profile photo to a funny face for 1 hour","Text your crush right now","Do 20 push-ups","Send your most embarrassing photo"];
module.exports = async (sock, chatId, message) => {
    await reply(sock, chatId, `🔥 *Dare*\n━━━━━━━━━━\n${dares[Math.floor(Math.random()*dares.length)]}`, message);
};