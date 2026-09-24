import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*======================================*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +573001533523
global.confirmCode = ''

//*======================================*
// TAMBIÉN PUEDES CAMBIAR LOS NUMEROS DE LOS OWNER A OTROS NUMEROS 
// QUE SEGNIFICA EL BRO RESPETA 🗣🔥

global.owner = [
['573162402768', '۪〬.࠭⤿ 👑 ⋅ 𝐁𝐀𝐉𝐎𝐁𝐎𝐓𝐒 𝐎𝐖𝐍𝐄𝐑', true],
['573001533523', '۪〬.࠭⤿ 👑 ⋅ 𝙏𝙃𝙀 𝙎𝙊𝙋𝙊𝙍𝙏', true],
['5214774444444', '۪〬.࠭⤿ 👑 ⋅ 𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿 💖🐈', true],
['51970334698', '۪〬.࠭⤿ 👑 ⋅ michigely', true],
];

//*======================================*
// TAMBIÉN CAMBIA LOS NUMEROS DE LO NUEVOS OWNER AQUI EN [GLOBAL.SUTTAG ES EL NÚMERO DEL OWNER PRINCIPAL 👑

global.mods = ['573162402768', '573001533523', '50231458537', '15614809253']
global.suittag = ['573001533523'] 
global.prems = ['573162402768', '573001533523', '5031458537', '15614809253']

//*======================================*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.9' 
global.languaje = 'Español'
global.vs = '2.2.0'
global.vsJB = '5.0'
global.nameqr = 'Duoqr'
global.namebot = 'DuoBot'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.NagiJadibts = true

//*======================================*
// LOS NOMBRES DEL BOT CÁMBIALO AQUI Y NO SEAS TAN ESTÚPID@ QUE NO VAS A PONER 
// QUE SEGNIFICA EL BRO RESPETA 🗣🔥

global.packname = '𝐈𝐬𝐚𝐠𝐢-𝐁𝐨𝐭 𝐕𝟏'
global.botname = '𝐈𝐬𝐚𝐠𝐢-𝐁𝐨𝐭 𝐕𝟏'
global.wm = '𝙸𝚜𝚊𝚐𝚒-𝙱𝚘𝚝 𝚅𝟷'
global.author = 'ＢＡＪＯＢＯＴＳ ＢＹ ＩＳＡＧＩ Ｖ１'
global.dev = 'Pᴏᴡᴇʀᴅ ʙʏ BᴀᴊᴏBᴏᴛs'
global.textbot = '𝙸𝚜𝚊𝚐𝚒 𝙱𝚘𝚝 𝙱𝚊𝚓𝚘𝙱𝚘𝚝𝚜'
global.etiqueta = '@BAJO ᙭ᗪ'
global.titulowm = 'Whatsapp Multi Device';
global.titulowm2 = '𝘚𝘶𝘱𝘦𝘳 𝘉𝘰𝘵 𝘋𝘦 𝘞𝘩𝘢𝘵𝘴𝘢𝘱𝘱'
global.igfg = '@BajoBots'
global.gt = 'ᶜʳᵉᵃᵗᵉᵈ ᴮʸ Bajo7';

//*======================================*

global.imagen0 = fs.readFileSync('./IsagiBot-V1.jpg');
global.imagen1 = fs.readFileSync('./Isagi-BotV1.jpg');
global.catalogo = fs.readFileSync('./Private.png');

// Owner : https://qu.ax/MKyTf.jpg

//*======================================*
// CAMBIA LAS IMÁGENES IGUAL AQUÍ 👇

global.moneda = 'dolares'
global.banner = 'https://qu.ax/KBQJn.jpg'
global.avatar = 'https://qu.ax/gFMdr.jpg'

//*======================================*
// AQUI NO TOCES NADA❌️

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.photoSity = [catalogo]

//*======================================*
// REMPLAZA LOS NUEVOS LINKS DE GRUPOS📲

global.gp1 = 'https://whatsapp.com/channel/0029VbAWGXyAO7R9SugHPF3M'
global.comunidad1 = 'https://chat.whatsapp.com/DeJvBuS7QgB3Ybp1BZulWL'
global.channel = 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'
global.channel2 = 'https://whatsapp.com/channel/0029VbAWGXyAO7R9SugHPF3M'
global.md = 'https://github.com/El-brayan502/NagiBotV2'
global.correo = 'kleinergalindo17@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbAY63K0gcfPaK8Y7r2k';

//*======================================*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363420303019043@newsletter', //Isagi-Bot V1 
}

//*======================================*

global.MyApiRestBaseUrl = 'https://api.cafirexos.com';
global.MyApiRestApikey = 'BrunoSobrino';
global.fgkeysapi = "elrebelde21";
global.openai_org_id = 'org-3';
global.openai_key = 'sk-0';
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['kurumi']; // ['BrunoSobrino_2']
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.apis = 'https://delirius-apiofc.vercel.app'

global.APIs = {
  ryzen: 'https://api.ryzendesu.vip',
  ApiEmpire: 'https://api-brunosobrino.zipponodes.xyz',
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  delirius: 'https://delirius-apiofc.vercel.app',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.fgmods.xyz': `${fgkeysapi}`,
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

//*═════════════════════════════*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    const emot = {
      level: '🌟 Nivel',
      coin: '🪙 Coin',
      exp: '✨ Experiencia',
      bank: '🏦 Banco',
      diamond: '💎 Diamante',
      health: '❤️ Salud',
      kyubi: '🌀 Magia',
      joincount: '💰 Token',
      emerald: '♦️ Esmeralda',
      stamina: '⚡ Energía',
      role: '⚜️ Rango',
      premium: '🎟️ Premium',
      pointxp: '📧 Puntos Exp',
      gold: '👑 Oro',
      iron: '⛓️ Hierro',
      coal: '🌑 Carbón',
      stone: '🪨 Piedra',
      potion: '🥤 Poción',
    };
    const results = Object.keys(emot).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }};
global.rpgg = { 
  emoticon(string) {
    string = string.toLowerCase();
    const emott = {
      level: '🌟',
      coin: '🪙',
      exp: '✨',
      bank: '🏦',
      diamond: '💎',
      health: '❤️',
      kyubi: '🌀',
      joincount: '💰',
      emerald: '♦️',
      stamina: '⚡',
      role: '⚜️',
      premium: '🎟️',
      pointxp: '📧',
      gold: '👑',
      iron: '⛓️',
      coal: '🌑',
      stone: '🪨',
      potion: '🥤',
    };
    const results = Object.keys(emott).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emott[results[0][0]];
  }};  

//*═════════════════════════════*

global.multiplier = 69
global.maxwarn = '3'

//*═════════════════════════════*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
