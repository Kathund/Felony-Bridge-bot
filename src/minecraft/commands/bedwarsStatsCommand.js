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

    this.name = 'bw'
    this.aliases = ['bedwars']
    this.description = 'Look up your Bedwars stats'
  }

 
  onCommand(username, message) {
    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    // get the player's stats
    HypAPI.getPlayer(player).then((data) => {
        // check the ammount of splits in the message
        if(message.split(' ').length != 2) {
          const mode = message.split(' ')[2]
          if(mode == 'solo' ||
            mode == 'doubles' ||
            mode == 'threes' ||
            mode == 'fours' ||
            mode == '4v4' ||
            mode == 'castle') {
              this.send(`/gc Info for ${player} in mode ${mode} - FKDR: ${data.stats.bedwars[mode].finalKDRatio}, Winstreak: ${data.stats.bedwars[mode].winstreak}, Wins: ${data.stats.bedwars[mode].wins}, WLR ${data.stats.bedwars[mode].WLRatio}, BLR ${data.stats.bedwars[mode].beds.BLRatio} - ${makeid(10)}`)
          }
          // else if (mode == 'men') {
          //   console.log(data.stats.skywars)
          // }
          else {
            this.send(`/gc Invalid mode! Valid Modes: [solo, double, threes, fours, 4v4, castle] - ${makeid(10)}`)
          }
          // console.log(data.stats.bedwars)
          // this.send(`/gc Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins} - ${makeid(10)}`)
        }
        else {
          this.send(`/gc Info for ${player} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio} - ${makeid(10)}`)
        }
    }).catch((err) => {
      this.send(`/gc ${player} dose not exist! - ${makeid(10)}`)
      console.log(`error was caused by ${username}`)
      console.log(err)
    })
  }
}

module.exports = PingCommand


