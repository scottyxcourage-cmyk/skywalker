const axios = require("axios");
const { reply } = require("./_helper");
module.exports = async (sock, chatId, message, args) => {
    const city = args.join(" ").trim(); if (!city) return reply(sock, chatId, "❌ Usage: .weather <city>", message);
    try {
        const r = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, { timeout: 10000 });
        const d=r.data.current_condition[0], a=r.data.nearest_area[0];
        await reply(sock, chatId, `🌤️ *Weather: ${a.areaName[0].value}, ${a.country[0].value}*\n━━━━━━━━━━\n🌡️ Temp: *${d.temp_C}°C* / ${d.temp_F}°F\n💧 Humidity: *${d.humidity}%*\n💨 Wind: *${d.windspeedKmph} km/h*\n☁️ *${d.weatherDesc[0].value}*`, message);
    } catch { await reply(sock, chatId, `❌ City not found: *${city}*`, message); }
};