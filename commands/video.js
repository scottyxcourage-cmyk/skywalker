const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs"), path = require("path");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const q = args.join(" ").trim(); if (!q) return reply(sock, chatId, "❌ Usage: .video <search>", message);
    await sock.sendMessage(chatId, { text: `🔍 Searching: *${q}*...` }, { quoted: message });
    try {
        const res = await yts(q); const vid = res.videos[0];
        if (!vid) return reply(sock, chatId, "❌ No results.", message);
        if (vid.duration.seconds>300) return reply(sock, chatId, "❌ Too long (max 5 min).", message);
        const tmp = path.join("./temp",`vid_${Date.now()}.mp4`);
        await new Promise((res,rej)=>ytdl(vid.url,{filter:"videoandaudio",quality:"lowest"}).pipe(fs.createWriteStream(tmp)).on("finish",res).on("error",rej));
        await sock.sendMessage(chatId, { video: fs.readFileSync(tmp), caption: `🎬 *${vid.title}*\n\n_skywalker©_` }, { quoted: message });
        try{fs.unlinkSync(tmp);}catch{}
    } catch { await reply(sock, chatId, "❌ Download failed.", message); }
};