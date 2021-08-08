// By yasss
const db = require('quick.db')
const discord  = require('discord.js')
const {OWNER_ID, PREFIX} = require('../../config.json')



module.exports.run = async (client, message, args) => {
    let wl = await db.get(`config.${message.guild.id}.whitelist`)
    let isWl = wl.filter(w => w === message.author.id)
    if (message.author.id !== OWNER_ID && isWl == undefined) return message.channel.send('You can\'t do this')
    let e = new discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true}))
    if (!args[0]) {
        let status = await db.get(`config.${message.guild.id}.antilink`)
        if (status == true) {
            e.setDescription('Antilink system : \`on\`')
        } else if (status == false) {
            e.setDescription('Antilink system : \`off\`')
        } else if (status == undefined) {
            e.setDescription(`You must set your antilink system up, do __${PREFIX}antilink__ on or __${PREFIX}antilink off__`)
        }
        return message.channel.send(e).then(m => m.delete({timeout : 10000}))
    } else if (args[0]) {
        if (args[0] == 'on') {
            db.set(`config.${message.guild.id}.antilink`, true)
            e.setDescription(`__Antilink system activated !__`)
            return message.channel.send(e).then(m => m.delete({timeout : 10000}))
        } else if (args[0] == 'off') {
            db.set(`config.${message.guild.id}.antilink`, false)
            e.setDescription(`__Antilink system disabled !__`)
            return message.channel.send(e).then(m => m.delete({timeout : 10000}))
        } else {
            return message.channel.send(`Invalid parameter`)
        }
    }

}

module.exports.help = {
    name: "antilink",
    description: "toggles for antilink",
    usage : 'antilink on / antilink off',
    cooldown: 5,
    aliases: ["al", "antilink"]
}