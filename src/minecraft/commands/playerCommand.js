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

class PlayerCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'player'
    this.aliases = ['']
    this.description = 'Look up a player'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    // get the player's stats
    HypAPI.getPlayer(player).then((data) => {
        // console log the data
        console.log(data)
        this.send(`/gc Info for ${player} - Rank: ${data.rank} Karma: ${data.karma} Network Level: ${data.level} Achievement Points: ${data.achievementPoints} - ${makeid(10)}`)
    }).catch((error) => {
      this.send(`/gc ${player} is not a valid player!`)
      console.log(error)
    })
  }
  else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = PlayerCommand


