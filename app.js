//  Author : Yasss 
//
//  Date : 8 August 2021
//
const link = "https://github.com/whereisyasss"
//
//  Technologies : JavaScript, Node.JS, Quick.DB
//
//  Made for : fun
//
//  Language used : English (so everyone can understand)
//
//  PLEASE USE THIS CODE ONLY IF YOU KNOW WHAT YOU'RE DOING
//

const {Client, Collection} = require('discord.js');
const { loadCommands, loadEvents } = require('./loader/loader');
const { TOKEN } = require('./config.json')
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();


loadCommands(client);
loadEvents(client);

client.login(TOKEN);