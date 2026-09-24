import fetch from 'node-fetch'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(
            m.chat,
            `🚩 *Ingrese el nombre de un repositorio de GitHub*\n\nEjemplo: ${usedPrefix + command} Ai-Yaemori`,
            m
        )
    }

    try {
        await m.react('🍇')

        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(text)}`
        const res = await fetch(url)
        const json = await res.json()

        if (res.status !== 200) throw json

        if (!json.items || !json.items.length) {
            await m.react('❌')
            return conn.reply(
                m.chat,
                '🚩 *No se encontraron resultados para:* ' + text,
                m
            )
        }

        let str = json.items.map((repo, index) => {
            return `
• 🍟 Resultado: ${index + 1}
• 📦 Link: ${repo.html_url}
• 👤 Creador: ${repo.owner.login}
• 🐣 Nombre: ${repo.name}
• 📅 Creado: ${formatDate(repo.created_at)}
• ⏰ Actualizado: ${formatDate(repo.updated_at)}
• 👁 Visitas: ${repo.watchers}
• 🍴 Bifurcado: ${repo.forks}
• ⭐ Estrellas: ${repo.stargazers_count}
• 🧩 Issues: ${repo.open_issues}
• 🎐 Descripción: ${repo.description || 'Sin Descripción'}
• ♻️ Clone: ${repo.clone_url}
            `.trim()
        }).join('\n\n─────────────────\n\n')

        const doc = [
            'pdf',
            'zip',
            'vnd.openxmlformats-officedocument.presentationml.presentation',
            'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]

        const document = doc[Math.floor(Math.random() * doc.length)]

        const buttonMessage = {
            document: {
                url: 'https://github.com/El-brayan502'
            },
            mimetype: `application/${document}`,
            fileName: 'Nagi Bot',
            fileLength: 99999999999999,
            pageCount: 200,
            contextInfo: {
                forwardingScore: 200,
                isForwarded: true,
                externalAdReply: {
                    mediaUrl: 'https://github.com/El-brayan502',
                    mediaType: 2,
                    previewType: 'pdf',
                    title: '• Resultados Encontrados 🔎',
                    body: 'Desarrollado por Brayan330',
                    sourceUrl: 'https://wa.me/50231458537'
                }
            },
            caption: str,
            footer: `• 𝚂𝙸 𝙳𝙴𝚂𝙴𝙰 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝚄𝙽
*𝚁𝙴𝙿𝙾𝚂𝙸𝚃𝙾𝚁𝙸𝙾 𝙳𝙴 𝙶𝙸𝚃𝙷𝚄𝙱*
*𝙴𝚂𝙲𝚁𝙸𝙱𝙰 ${usedPrefix}gitclone <LINK>*`
        }

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
        await m.react('✅')

    } catch (error) {
        console.error(error)
        await m.react('❌')
        await conn.reply(
            m.chat,
            '🚩 *No se encontraron resultados para:* ' + text,
            m
        )
    }
}

handler.help = ['githubsearch']
handler.tags = ['buscador']
handler.command = ['githubsearch']
handler.register = true

export default handler

function formatDate(n, locale = 'es') {
    const d = new Date(n)

    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
            }
