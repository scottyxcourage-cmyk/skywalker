const { reply } = require("./_helper");
const truths = ["What is your biggest fear?","Have you ever lied to your best friend?","What is your most embarrassing moment?","Who do you have a crush on?","What is your biggest secret?"];
module.exports = async (sock, chatId, message) => {
    await reply(sock, chatId, `🤍 *Truth*\n━━━━━━━━━━\n${truths[Math.floor(Math.random()*truths.length)]}`, message);
};