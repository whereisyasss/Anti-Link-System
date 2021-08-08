const { Collection, MessageEmbed } = require('discord.js')
const db  = require('quick.db')
const {DEFAULT_PREFIX, OWNER_ID} = require('./../config.json')
let prefix = DEFAULT_PREFIX

const links = [
  "http",
  "https",
  "discord.gg",
  "discord.me",
  "dsc.io",
  "discord.io",
  "discord.bio",
  "dsc.bio",
  "www",
  ".ga",
  ".fr"
]

module.exports = async (client, message) => {
    /// conditions ///////////////////////////////////////////
    if (!message) return
    if (!message.guild) return

    /// START LINK CHECK

    let wl = await db.get(`config.${message.guild.id}.whitelist`)
    let isWl = wl.filter(w => w === message.author.id)
    let hasLink = false
    for (let l of links) {
      if (message.content.includes(l)) {
        hasLink = true
      }
    }

    if (hasLink == true && (isWl == undefined || OWNER_ID !== message.author.id)) {
      message.delete()
      let e = new MessageEmbed().setDescription(`${message.author} you can't send links here`)
      return message.channel.send(e)
    }

    /// END LINK CHECK
    
    if (message.content.startsWith("<@" + client.user.id + ">")) return message.channel.send(`My prefix is : ${prefix}`)
    if (!message.content.startsWith(prefix)) return
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (commandName.length <= 0) return;
    /// command handler ///////////////////////////////////////
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName))
    if (!command) return
    if (!client.cooldowns.has(command.help.name)) {
      client.cooldowns.set(command.help.name, new Collection())
    }
    /// cooldown /////////////////////////////////////////////
    const timeNow = Date.now()
    const tStamps = client.cooldowns.get(command.help.name)
    const cdAmount = (command.help.cooldown) * 1000
    let unit = 'seconds'

    if (tStamps.has(message.author.id)) {
      const cooldownExp = tStamps.get(message.author.id) + cdAmount
      
      if (timeNow < cooldownExp) {
        timeLeft = (cooldownExp - timeNow) / 1000;
        console.log(timeLeft)
        if (timeLeft >= 3600) {
          timeLeft = timeLeft/3600
          if (timeLeft >= 60) {
            timeLeft = timeLeft/60
          }
          unit = 'hours'
        } else if (timeLeft < 3600 && timeLeft >= 60) {
          timeLeft = timeLeft/60
          unit = 'minutes'
        } 
        return message.reply(`You have to wait ${timeLeft.toFixed(0)} ${unit} before reusing ${commandName} `)
      }
    }

    tStamps.set(message.author.id, timeNow)
    setTimeout(() => tStamps.delete(message.author.id), cdAmount)
    command.run(client, message, args)
  
   
    
}