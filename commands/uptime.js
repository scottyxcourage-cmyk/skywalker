const { reply } = require("./_helper");
module.exports = async (sock, chatId, message) => {
    const up = process.uptime();
    const d=Math.floor(up/86400),h=Math.floor((up%86400)/3600),m=Math.floor((up%3600)/60),s=Math.floor(up%60);
    const pct=Math.min(100,Math.round((up/86400)*100));
    const bar="█".repeat(Math.round(pct/10))+"░".repeat(10-Math.round(pct/10));
    await reply(sock, chatId, `⚡ *Skywalker Uptime*\n━━━━━━━━━━━━━━━━\n📅 *${d}d* 🕐 *${h}h* 🕑 *${m}m* 🕒 *${s}s*\n\n${bar} ${pct}%\n\n💾 RAM: *${(process.memoryUsage().rss/1024/1024).toFixed(1)}MB*`, message);
};