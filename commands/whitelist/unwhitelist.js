//By yasss
const db = require('quick.db')
const discord  = require('discord.js')
const {OWNER_ID} = require('../../config.json')

module.exports.run = async (client, message, args) => {
    
    let wl = db.get(`config.${message.guild.id}.whitelist`)
    if (message.author.id !== OWNER_ID) return message.channel.send('You can\'t do this').then(m => m.delete({timeout : 10000}))
    let embed = new discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
    if (!args[0]) {
        return message.channel.send(`You must mention someone or give his ID`).then(m => m.delete({timeout : 10000}))
        
    }
    let user = args[0].replace(/[\\<>@#&!]/g, "")
    if (!user) return message.channel.send(`You must mention someone or give his ID`).then(m => m.delete({timeout : 10000}))
    
    let isWl = await wl.filter(w => w === message.author.id)
    if(isWl == undefined) return message.channel.send(`This member wasn't whitelisted`).then(m => m.delete({timeout : 10000}))
    db.set(`config.${message.guild.id}.whitelist`, wl.filter(w => w !== message.author.id))
    embed.setDescription(`<@${user}> has been removed from the whitelist !`)
    return message.channel.send(embed).then(m => m.delete({timeout : 10000}))
}

module.exports.help = {
    name: "unwhitelist",
    description: "removes a member from the whitelist",
    cooldown: 0,
    aliases: ["unwl", "unbypass"]

}