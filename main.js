/**
 * Skywalker_MD — Main Handler
 * 100 Commands | Owner: 263773367795
 */
const settings  = require("./settings");
const { getSender }   = require("./lib/getSender");
const { makeIsOwner } = require("./lib/isOwner");
const { isBanned }    = require("./lib/isBanned");
const { getMode }     = require("./commands/mode");
const { chatbotCommand, handleChatbot } = require("./commands/chatbot");
const { welcomeCommand, handleJoin }    = require("./commands/welcome");
const { goodbyeCommand, handleLeave }   = require("./commands/goodbye");
const { autoReplyCommand, handleAutoReply } = require("./commands/autoreply");
const { antilinkCommand, handleLink }   = require("./commands/antilink");
const { modeCommand }                   = require("./commands/mode");
const { alwaysOnlineCommand }           = require("./commands/alwaysonline");
const { anticallCommand }               = require("./commands/anticall");
const broadcast = require("./commands/broadcast");

const cmds = {
    menu: require("./commands/menu"),
    alive: require("./commands/alive"),
    ping: require("./commands/ping"),
    sticker: require("./commands/sticker"),
    ai: require("./commands/ai"),
    tiktok: require("./commands/tiktok"),
    vv: require("./commands/vv"),
    kick: require("./commands/kick"),
    promote: require("./commands/promote"),
    demote: require("./commands/demote"),
    mute: require("./commands/mute"),
    unmute: require("./commands/unmute"),
    open: require("./commands/open"),
    close: require("./commands/close"),
    tagall: require("./commands/tagall"),
    hidetag: require("./commands/hidetag"),
    warn: require("./commands/warn"),
    add: require("./commands/add"),
    link: require("./commands/link"),
    resetlink: require("./commands/resetlink"),
    setname: require("./commands/setname"),
    setdesc: require("./commands/setdesc"),
    ban: require("./commands/ban"),
    unban: require("./commands/unban"),
    join: require("./commands/join"),
    leave: require("./commands/leave"),
    setbio: require("./commands/setbio"),
    restart: require("./commands/restart"),
    tostatus: require("./commands/tostatus"),
    block: require("./commands/block"),
    unblock: require("./commands/unblock"),
    react: require("./commands/react"),
    online: require("./commands/online"),
    translate: require("./commands/translate"),
    deepseek: require("./commands/deepseek"),
    weather: require("./commands/weather"),
    wiki: require("./commands/wiki"),
    define: require("./commands/define"),
    lyrics: require("./commands/lyrics"),
    imdb: require("./commands/imdb"),
    github: require("./commands/github"),
    yts: require("./commands/yts"),
    news: require("./commands/news"),
    calc: require("./commands/calc"),
    qr: require("./commands/qr"),
    tts: require("./commands/tts"),
    encode: require("./commands/encode"),
    decode: require("./commands/decode"),
    flip: require("./commands/flip"),
    dice: require("./commands/dice"),
    choose: require("./commands/choose"),
    remind: require("./commands/remind"),
    ssweb: require("./commands/ssweb"),
    tinyurl: require("./commands/tinyurl"),
    genpass: require("./commands/genpass"),
    fliptext: require("./commands/fliptext"),
    joke: require("./commands/joke"),
    fact: require("./commands/fact"),
    quote: require("./commands/quote"),
    meme: require("./commands/meme"),
    trivia: require("./commands/trivia"),
    ship: require("./commands/ship"),
    roast: require("./commands/roast"),
    truth: require("./commands/truth"),
    dare: require("./commands/dare"),
    "8ball": require("./commands/eightball"),
    toimg: require("./commands/toimg"),
    tomp3: require("./commands/tomp3"),
    toaudio: require("./commands/toaudio"),
    tovideo: require("./commands/tovideo"),
    bass: require("./commands/bass"),
    robot: require("./commands/robot"),
    earrape: require("./commands/earrape"),
    deep: require("./commands/deep"),
    play: require("./commands/play"),
    video: require("./commands/video"),
    instagram: require("./commands/instagram"),
    twitter: require("./commands/twitter"),
    facebook: require("./commands/facebook"),
    youtube: require("./commands/youtube"),
    image: require("./commands/image"),
    pin: require("./commands/pin"),
    antidelete: require("./commands/antidelete"),
    antiviewonce: require("./commands/antiviewonce"),
    autoreact: require("./commands/autoreact"),
    autoread: require("./commands/autoread"),
    setwelcome: require("./commands/setwelcome"),
    setgoodbye: require("./commands/setgoodbye"),
    setprefix: require("./commands/setprefix"),
    groupinfo: require("./commands/groupinfo"),
    uptime: require("./commands/uptime"),
    runtime: require("./commands/runtime"),
    getdp: require("./commands/getdp"),
    savestatus: require("./commands/savestatus"),
};

const aliases = {
    help:"menu", s:"sticker", ask:"ai", viewonce:"vv",
    remove:"kick", everyone:"tagall", ht:"hidetag",
    tr:"translate", dict:"define", math:"calc",
    qrcode:"qr", coin:"flip", roll:"dice", pick:"choose",
    t2s:"tts", b64:"encode", yt:"youtube", fb:"facebook",
    ig:"instagram", dp:"getdp", status:"savestatus",
    ping2:"ping", botstatus:"alive",
};

async function handleMessages(sock, update) {
    try {
        const { messages, type } = update;
        if (type !== "notify") return;
        const message = messages[0];
        if (!message?.message) return;
        if (Object.keys(message.message)[0]==="ephemeralMessage")
            message.message = message.message.ephemeralMessage.message;

        const chatId  = message.key.remoteJid;
        const isGroup = chatId?.endsWith("@g.us");
        const sender  = getSender(sock, message);

        if (!chatId||!sender) return;
        if (chatId==="status@broadcast") return;
        if (isBanned(sender)) return;

        // Track DM users for broadcast
        if (!isGroup && !message.key.fromMe) broadcast.addUser(sender);

        // Private mode
        const isOwnerFn = makeIsOwner(sock._ownerPhone||"");
        if (getMode().mode==="private" && !message.key.fromMe && !await isOwnerFn(sender, sock, chatId)) return;

        const rawText =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            message.message?.imageMessage?.caption ||
            message.message?.videoMessage?.caption || "";

        // Auto-reply (DMs only)
        if (!isGroup && rawText) await handleAutoReply(sock, message);

        // Group features
        if (isGroup) {
            await handleLink(sock, chatId, message);
        }

        const prefix = settings.prefix || ".";
        if (!rawText.trim().startsWith(prefix)) {
            if (rawText) await handleChatbot(sock, chatId, message, rawText);
            return;
        }

        const body = rawText.trim().slice(prefix.length);
        const cmdName = body.split(/\s+/)[0].toLowerCase();
        const args = body.split(/\s+/).slice(1);
        const resolved = aliases[cmdName] || cmdName;

        // Special commands with named exports
        if (resolved==="chatbot"||resolved==="cb") return await chatbotCommand(sock, chatId, message, args);
        if (resolved==="welcome")   return await welcomeCommand(sock, chatId, message, args);
        if (resolved==="goodbye"||resolved==="bye") return await goodbyeCommand(sock, chatId, message, args);
        if (resolved==="autoreply"||resolved==="ar") return await autoReplyCommand(sock, chatId, message, args);
        if (resolved==="antilink")  return await antilinkCommand(sock, chatId, message, args);
        if (resolved==="mode")      return await modeCommand(sock, chatId, message, args);
        if (resolved==="alwaysonline"||resolved==="ao") return await alwaysOnlineCommand(sock, chatId, message, args);
        if (resolved==="anticall")  return await anticallCommand(sock, chatId, message, args);
        if (resolved==="broadcast"||resolved==="bc") return await broadcast(sock, chatId, message, args);

        const fn = cmds[resolved];
        if (fn) await fn(sock, chatId, message, args);

    } catch(e) {
        if (!e.message?.includes("Connection")) console.error("Handler error:", e.message);
    }
}

async function handleGroupParticipantUpdate(sock, update) {
    try {
        const { id, participants, action } = update;
        if (!id.endsWith("@g.us")) return;
        if (action==="add")    await handleJoin(sock, id, participants);
        if (action==="remove") await handleLeave(sock, id, participants);
    } catch {}
}

module.exports = { handleMessages, handleGroupParticipantUpdate };
