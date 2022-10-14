
const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = new HypixelAPIReborn.Client('cc4cde34-734e-4b33-9bc6-51c65006ccff')
const check = 'enabled'

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

class guildCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'guild'
    this.aliases = ['guild']
    this.description = 'Look up your duels stats'
  }

 
onCommand(username, message) {
    if (check != 'disabled') {
        // get the player name in the second word of the message
        const guild = message.split(' ')[1]
        // get the player's stats
        HypAPI.getGuild('name', guild).then((data) => {
            // console.log(data)
            this.send(`/gc Guild info for ${data.name} - Tag: ${data.tag} Members: ${data.members.length} Level: ${data.level} Achievements: Online Players: ${data.achievements.onlinePlayers} Winners: ${data.achievements.winners} - ${makeid(10)}`)
        }).catch((error) => {
          this.send(`/gc ${guild} does not exist! - ${makeid(10)}`)
          console.log(`error was caused by ${username}`)
          console.log(error)
        })
  } else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = guildCommand


