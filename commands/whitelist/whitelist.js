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
        let wstr = ''
        if (wl == undefined) wstr = "No whitelisted."
        else {
            for (w of wl) {
                wstr += `<@${w}>` + '\n'
            }
        }
        embed.setDescription(wstr)
        embed.setTitle('__Whitelist users :__')
        return message.channel.send(embed).then(m => m.delete({timeout : 10000}))
        
    }
    let user = args[0].replace(/[\\<>@#&!]/g, "")
    if (!user) return message.channel.send(`You must mention someone or give his ID`).then(m => m.delete({timeout : 10000}))
    
    let isWl = await wl.filter(w => w === message.author.id)
    if(isWl !== undefined) return message.channel.send(`This member is already whitelisted`).then(m => m.delete({timeout : 10000}))
    db.push(`config.${message.guild.id}.whitelist`, user)
    embed.setDescription(`<@${user}> is now whitelisted !`)
    return message.channel.send(embed).then(m => m.delete({timeout : 10000}))
}

module.exports.help = {
    name: "whitelist",
    description: "adds a member to the whitelist",
    cooldown: 0,
    aliases: ["wl", "bypass"]

}