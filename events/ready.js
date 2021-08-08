module.exports = client => {
    client.user.setActivity(`By yasss`, {type : 'STREAMING', url : 'https://twitch.tv/sweatz_z'})
    console.log(`Connected as ${client.user.tag}`)
}