// El nombre del bot se puede cambiar, sí :v, lo siento, no se cambia automáticamente. 

import os from 'os'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import fetch from 'node-fetch'

let stateMenu = 0;

let handler = async (m, { conn, usedPrefix: _p, _args: theargs }) => {
  let p = '```'
  let x = '`'
  let tags = {}

  const defaultMenu = {
  before: `
┏━━━━━━━━━━━━━━━━━━
┃  *ɪɴғᴏ- ʙᴏᴛ*
┣━━━━━━━━━━━━━━━━━━
┃ • *ɴᴏᴍʙʀᴇ ʙᴏᴛ*  : ${global.namebot}
┃ • *ᴄʀᴇᴀᴛᴏʀ*     : BajoBots X Isagi-Bot 
┃ • *ᴠᴇʀsɪ*     : ${global.versi}
┣━━━━━━━━━━━━━━━━━━
┃  *ɪɴғᴏ - ᴜsᴇʀ*
┣━━━━━━━━━━━━━━━━━━
┃ • *ɴᴏᴍʙʀᴇ ᴜsᴇʀ* : ${m.pushName || conn.getName(m.sender)}
┃ • *ᴛᴏᴛᴀʟ ᴜsᴜᴀʀɪᴏs*    :  %totalreg
┗━━━━━━━━━━━━━━━━━━
`.trimStart(),

    header: `
┣━━━━━━━━━━━━━━━━
┃ *%category*
┣━━━━━━━━━━━━━━━━`,

    body: `┃ • .%cmd`,

    footer: '┗━━━━━━━━━━━━━━━━',

    after: `> © Bajo! - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ`
  }

  try {
    let name = m.pushName || conn.getName(m.sender)  // Nama pengguna
    let botName = global.namebot || conn.getName(conn.user.jid)  // Nama bot (ambil dari config)

    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    })
    let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jakarta' }).replace(/[.]/g, ':')

    let _muptime, _uptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
      process.send('uptime')
      _uptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }

    let totalreg = Object.keys(global.db.data.users).length
    let platform = os.platform()
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }))

    for (let plugin of help) {
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    }

    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after

    let alltags = []
    let menunya = []

    if (theargs?.length > 0) {
      if (theargs?.includes("next")) {
        let tag = Object.keys(tags)[Math.floor(Math.random() * Object.keys(tags).length)]
        menunya = [ header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, help).trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        ]
      } else {
        menunya = Object.keys(tags).map(tag => {
          alltags.push(`- *${tag}*`)
          if (!theargs.includes(tag) && !theargs.includes('all')) return ''
          return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, help).trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        })
      }
    } else if (theargs?.length === 0) {
      menunya = [global?.msg?.menu(m)]
    }

    menunya = menunya.filter(item => item !== '' && item !== undefined && item !== null)

    if (menunya?.length <= 0) {
      menunya = [`Menu "${theargs.join(' ')}" tidak ditemukan. Tag tersedia:`]
      menunya.push(...alltags)
    }

    let _text = [before, ...menunya, after].join('\n')

    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      name, date, time, platform, _p, totalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let loadingFrames = [
      '*[ ⚀ ] Loading...*\n_*▰▱▱▱▱*_',
      '*[ ⚁ ] Loading...*\n_*▱▰▱▱▱*_',
      '*[ ⚂ ] Loading...*\n_*▱▱▰▱▱*_',
      '*[ ⚃ ] Loading...*\n_*▱▱▱▰▱*_',
      '*[ ⚄ ] Loading...*\n_*▱▱▱▱▰*_',
      '*[ ✔ ] Selesai!*'
    ]

    let { key } = await conn.sendMessage(m.chat, { text: loadingFrames[0] }, { quoted: m })

    for (let i = 1; i < loadingFrames.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200)) // bisa diatur jadi 100-300ms
      await conn.sendMessage(m.chat, { text: loadingFrames[i], edit: key })
    }

    await conn.sendMessage(m.chat, {
  document: { url: 'https://wa.me' },
  mimetype: 'application/pdf',
  fileName: m.name,
  fileLength: 1000000000000,
  caption: text.trim(),
  contextInfo: {
    isForwarded: true,
    externalAdReply: {
      title: botName,
      body: 'zen',
      thumbnailUrl: 'https://qu.ax/KBQJn.jpg',
      sourceUrl: 'https://wa.me',
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
buttons: [
      {
        buttonId: '.menu all',
        buttonText: {
          displayText: 'ᴀʟʟᴍᴇɴᴜ 📚'
        },
        type: 1,
      },
      {
        buttonId: '.owner',
        buttonText: {
          displayText: 'ᴏᴡɴᴇʀ👤'
        },
        type: 1,
      },
      {
        buttonId: 'action',
        buttonText: { displayText: 'sᴇᴍᴜᴀ ᴍᴇɴᴜ' },
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: 'ɪsᴀɢɪ ʙᴏᴛ ᴠ𝟷 - ᴍᴇɴᴜ',
            sections: [
              {
                title: 'ɪsᴀɢɪ ʙᴏᴛ ᴠ𝟷 - ᴍᴇɴᴜ',
                highlight_label: 'ɪsᴀɢɪ ʙᴏᴛ ᴠ𝟷 - ᴍᴇɴᴜ',
                rows: [
                  { title: 'ᴀʟʟᴍᴇɴᴜ 📚', description: '➡️ ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ꜱᴇᴍᴜᴀ ᴍᴇɴᴜ', id: '.menu all' },
                  { title: 'ᴀᴅᴠᴀɴᴄᴇᴅ 🧪', description: '➡️ ᴍᴇɴᴜ ᴀᴅᴠᴀɴᴄᴇᴅ', id: '.menu advanced' },
                  { title: 'ᴀɪ 🤖', description: '➡️ ᴍᴇɴᴜ ᴀɪ', id: '.menu ai' },
                  { title: 'ᴀɴᴏɴʏᴍᴏᴜꜱ 🕵️‍♂️', description: '➡️ ᴍᴇɴᴜ ᴀɴᴏɴʏᴍᴏᴜꜱ', id: '.menu anonymous' },
                  { title: 'ᴀᴜᴅɪᴏ 🎧', description: '➡️ ᴍᴇɴᴜ ᴀᴜᴅɪᴏ', id: '.menu audio' },
                  { title: 'ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ⬇️', description: '➡️ ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ', id: '.menu downloader' },
                  { title: 'ꜰᴜɴ 🎉', description: '➡️ ᴍᴇɴᴜ ꜰᴜɴ', id: '.menu fun' },
                  { title: 'ɢᴀᴍᴇ 🎮', description: '➡️ ᴍᴇɴᴜ ɢᴀᴍᴇ', id: '.menu game' },
                  { title: 'ɢʀᴏᴜᴘ 👥', description: '➡️ ᴍᴇɴᴜ ɢʀᴏᴜᴘ', id: '.menu group' },
                  { title: 'ɪɴꜰᴏ ℹ️', description: '➡️ ᴍᴇɴᴜ ɪɴꜰᴏ', id: '.menu info' },
                  { title: 'ɪɴᴛᴇʀɴᴇᴛ 🌐', description: '➡️ ᴍᴇɴᴜ ɪɴᴛᴇʀɴᴇᴛ', id: '.menu internet' },
                  { title: 'ɪꜱʟᴀᴍɪ 🕌', description: '➡️ ᴍᴇɴᴜ ɪꜱʟᴀᴍɪ', id: '.menu islami' },
                  { title: 'ɪꜱʟᴀᴍɪᴄ 🕋', description: '➡️ ᴍᴇɴᴜ ɪꜱʟᴀᴍɪᴄ', id: '.menu islamic' },
                  { title: 'ᴋᴇʀᴀɴɢ 🐚', description: '➡️ ᴍᴇɴᴜ ᴋᴇʀᴀɴɢ', id: '.menu kerang' },
                  { title: 'ᴍᴀɪɴ 🧭', description: '➡️ ᴍᴇɴᴜ ᴍᴀɪɴ', id: '.menu main' },
                  { title: 'ᴍᴀᴋᴇʀ ✏️', description: '➡️ ᴍᴇɴᴜ ᴍᴀᴋᴇʀ', id: '.menu maker' },
                  { title: 'ɴꜱꜰᴡ 🔞', description: '➡️ ᴍᴇɴᴜ ɴꜱꜰᴡ', id: '.menu nsfw' },
                  { title: 'ᴏᴡɴᴇʀ 👑', description: '➡️ ᴍᴇɴᴜ ᴏᴡɴᴇʀ', id: '.menu owner' },
                  { title: 'ᴘʀᴇᴍɪᴜᴍ 💎', description: '➡️ ᴍᴇɴᴜ ᴘʀᴇᴍɪᴜᴍ', id: '.menu premium' },
                  { title: 'ᴘʀɪᴍʙᴏɴ 🔮', description: '➡️ ᴍᴇɴᴜ ᴘʀɪᴍʙᴏɴ', id: '.menu primbon' },
                  { title: 'ʀᴘɢ ⚔️', description: '➡️ ᴍᴇɴᴜ ʀᴘɢ', id: '.menu rpg' },
                  { title: 'ꜱᴇᴀʀᴄʜ 🔍', description: '➡️ ᴍᴇɴᴜ ꜱᴇᴀʀᴄʜ', id: '.menu search' },
                  { title: 'ꜱᴏᴜɴᴅ 🔊', description: '➡️ ᴍᴇɴᴜ ꜱᴏᴜɴᴅ', id: '.menu sound' },
                  { title: 'ꜱᴛᴀʟᴋᴇʀ 🕵️', description: '➡️ ᴍᴇɴᴜ ꜱᴛᴀʟᴋᴇʀ', id: '.menu stalker' },
                  { title: 'ꜱᴛɪᴄᴋᴇʀ 🖼️', description: '➡️ ᴍᴇɴᴜ ꜱᴛɪᴄᴋᴇʀ', id: '.menu sticker' },
                  { title: 'ꜱᴛᴏʀᴇ 🛒', description: '➡️ ᴍᴇɴᴜ ꜱᴛᴏʀᴇ', id: '.menu store' },
                  { title: 'ᴛᴏᴏʟꜱ 🛠️', description: '➡️ ᴍᴇɴᴜ ᴛᴏᴏʟꜱ', id: '.menu tools' },
                  { title: 'ᴜꜱᴇʀ 👤', description: '➡️ ᴍᴇɴᴜ ᴜꜱᴇʀ', id: '.menu user' },
                  { title: 'xᴘ 📈', description: '➡️ ᴍᴇɴᴜ xᴘ', id: '.menu xp' }
                ]
              }
            ]
          })
        }
      }
    ],
    headerType: 1
}, { quoted: m })
  } catch (e) {
    m.reply('Error')
  }
}

handler.command = /^(menu|allmenu)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  return [d, 'H ', h, 'J ', m, 'M*'].map(v => v.toString().padStart(2, 0)).join('')
}

// Konfigurasi agar tidak ngetag
global.configMenuTagUser = false