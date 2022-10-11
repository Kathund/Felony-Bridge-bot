const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = new HypixelAPIReborn.Client('cc4cde34-734e-4b33-9bc6-51c65006ccff')

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

class PingCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'sw'
    this.aliases = ['skywars']
    this.description = 'Look up your skywars stats'
  }

 
  onCommand(username, message) {
    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    // get the player's stats
    HypAPI.getPlayer(player).then((data) => {
        // check the ammount of splits in the message
        if(message.split(' ').length == 2) {
          this.send(`/gc Info for ${player} - Level: ${data.stats.skywars.level}, Kills: ${data.stats.skywars.kills}, Wins: ${data.stats.skywars.wins}, KD: ${data.stats.skywars.KDRatio}, WLR: ${data.stats.skywars.WLRatio},- ${makeid(10)}`)
        }
    }).catch((error) => {
      this.send(`/gc ${player} is not a valid player!`)
      console.log(error)
    })
  }
}

module.exports = PingCommand


