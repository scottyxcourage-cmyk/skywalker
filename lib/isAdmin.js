const cache = new Map();
const TTL = 5000;
function extractNum(id) { if (!id) return ""; return id.split(":")[0].split("@")[0]; }
async function getMeta(sock, gid) {
    const c = cache.get(gid); if (c && Date.now()-c.ts<TTL) return c.data;
    const data = await sock.groupMetadata(gid); cache.set(gid,{data,ts:Date.now()}); return data;
}
async function isAdmin(sock, gid, uid) {
    try {
        if (!sock||!gid||!uid) return false;
        const meta = await getMeta(sock, gid);
        const sNum=extractNum(uid), sFull=uid, sWo=uid.includes("@")?uid.split("@")[0]:uid;
        return (meta.participants||[]).some(p => {
            const pId=(p.id||"").split("@")[0], pFull=p.id||"", pFL=p.lid||"", pLid=(p.lid||"").split("@")[0];
            return (sFull===pFull||sFull===pFL||sNum===pId||sWo===pId||(pLid&&sWo===pLid))&&(p.admin==="admin"||p.admin==="superadmin");
        });
    } catch { return false; }
}
async function isBotAdmin(sock, gid) {
    try {
        const botId=sock.user?.id||"", botNum=extractNum(botId);
        const meta=await getMeta(sock,gid);
        return (meta.participants||[]).some(p=>(botId===p.id||botNum===(p.id||"").split("@")[0])&&(p.admin==="admin"||p.admin==="superadmin"));
    } catch { return false; }
}
async function getAdmins(sock, gid) {
    try { const meta=await getMeta(sock,gid); return (meta.participants||[]).filter(p=>p.admin).map(p=>p.id); } catch { return []; }
}
module.exports = isAdmin;
module.exports.isAdmin=isAdmin; module.exports.isBotAdmin=isBotAdmin; module.exports.getAdmins=getAdmins; module.exports.extractNum=extractNum;
