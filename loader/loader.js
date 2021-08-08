const fs = require('fs')

const loadCommands = (client, dir = './commands/') => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
    
    for (const file of commands) {
        const filename = require(`../${dir}/${dirs}/${file}`)
        client.commands.set(filename.help.name, filename)
        client.aliases.set(filename.help.aliases, filename)

        console.log(`[COMMAND] ${filename.help.name} loaded, aliases : ${filename.help.aliases}`)
    }
    })
}

///////////// events //////////////////////////////////////

const loadEvents = (client, dir = './events/') => {
    const events = fs.readdirSync(`${dir}/`).filter(files => files.endsWith('.js'));
    
    for (const event of events) {""
        const file = require(`../${dir}/${event}`)
        const filename = event.split(".")[0]
        client.on(filename, file.bind(null, client))
        console.log(`[EVENTS] ${filename} loaded`)
    }
}

module.exports = {
    loadCommands,
    loadEvents
}