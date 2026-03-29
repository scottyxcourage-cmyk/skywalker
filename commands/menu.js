const settings = require("../settings");
module.exports = async (sock, chatId, message) => {
    const up = process.uptime();
    const h=Math.floor((up%86400)/3600),m=Math.floor((up%3600)/60),s=Math.floor(up%60);
    const hour = new Date().getHours();
    const greet = hour<12?"🌅 Good Morning":hour<17?"☀️ Good Afternoon":"🌙 Good Evening";
    await sock.sendMessage(chatId, { text:
`╔═══════════════════════════╗
║  ⚡  *Skywalker_MD*  ⚡   ║
║  _v${settings.version} | © Skywalker_    ║
╚═══════════════════════════╝

${greet}! 🌌

⏱️ Uptime: *${h}h ${m}m ${s}s*
📋 Prefix: *${settings.prefix}*

━━━━━━━━━━━━━━━━━━━━━━━
🤖 *AI & CHAT*
◈ .ai .deepseek .chatbot .translate

👥 *GROUP*
◈ .kick .promote .demote .mute .unmute
◈ .tagall .hidetag .warn .kick .add
◈ .open .close .link .resetlink
◈ .setname .setdesc .welcome .goodbye

👑 *OWNER*
◈ .ban .unban .broadcast .join .leave
◈ .setbio .setpp .restart .tostatus
◈ .block .unblock .react .online
◈ .mode .alwaysonline .autoreply

🎵 *MEDIA*
◈ .sticker .toimg .tiktok .song
◈ .vv .tomp3 .toaudio .tovideo
◈ .bass .robot .earrape .deep

📥 *DOWNLOAD*
◈ .play .video .instagram .twitter
◈ .facebook .youtube .image .pin

🔍 *SEARCH*
◈ .weather .wiki .define .lyrics
◈ .imdb .github .yts .news

🛠️ *TOOLS*
◈ .calc .qr .tts .encode .decode
◈ .flip .dice .choose .remind
◈ .ssweb .tinyurl .genpass .fliptext

🎮 *FUN*
◈ .joke .fact .quote .meme .trivia
◈ .ship .roast .truth .dare .8ball

⚙️ *SETTINGS*
◈ .anticall .antidelete .antilink
◈ .antiviewonce .autoreact .autoread
◈ .setwelcome .setgoodbye .setprefix

━━━━━━━━━━━━━━━━━━━━━━━
_skywalker©_\`
    }, { quoted: message });
};
