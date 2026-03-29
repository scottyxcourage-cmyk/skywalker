function extractNum(id) { if (!id) return ""; return id.split(":")[0].split("@")[0]; }
function makeIsOwner(ownerPhone) {
    const ownerClean = extractNum(ownerPhone);
    return async function isOwner(senderId, sock, chatId) {
        if (!senderId) return false;
        const s = extractNum(senderId);
        if (senderId === ownerClean + "@s.whatsapp.net") return true;
        if (s === ownerClean) return true;
        if (process.env.OWNER_NUMBER && s === extractNum(process.env.OWNER_NUMBER)) return true;
        if (sock && chatId && chatId.endsWith("@g.us") && senderId.includes("@lid")) {
            try {
                const meta = await sock.groupMetadata(chatId);
                const p = (meta.participants||[]).find(p => p.lid===senderId || extractNum(p.id||"")===s || extractNum(p.id||"")===ownerClean);
                if (p && extractNum(p.id||"")===ownerClean) return true;
            } catch {}
        }
        if (ownerClean && senderId.includes(ownerClean)) return true;
        return false;
    };
}
module.exports = { makeIsOwner, extractNum };
