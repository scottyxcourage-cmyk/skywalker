const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const sides = parseInt(args[0])||6;
    const result = Math.floor(Math.random()*sides)+1;
    await reply(sock, chatId, `🎲 *Dice Roll (d${sides})*\n\nResult: *${result}*`, message);
};