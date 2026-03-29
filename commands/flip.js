const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    const r = Math.random()>0.5?"🪙 *HEADS!*":"🪙 *TAILS!*";
    await reply(sock, chatId, r, message);
};