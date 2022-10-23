const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel.js')
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

class BedwarsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'bw'
    this.aliases = ['bedwars']
    this.description = 'Look up your Bedwars stats'
  }

 
  onCommand(username, message) {
    if (check != 'disabled') {
      if (username != 'SpookyBurger') {
      // get the player name in the second word of the message
      const player = message.split(' ')[1]
      // get the player's stats
      if (player == 'solo' || player == 'doubles' || player == 'threes' || player == 'fours' || player == '4v4') {
        HypAPI.getPlayer(username).then((data) => {
          this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${data.stats.bedwars[player].finalKDRatio}, Winstreak: ${data.stats.bedwars[player].winstreak}, Wins: ${data.stats.bedwars[player].wins}, WLR ${data.stats.bedwars[player].WLRatio}, BLR ${data.stats.bedwars[player].beds.BLRatio}, Finals: ${data.stats.bedwars[player].finalKills}, Beds: ${data.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
        })
      }
      else if (player == 'overall') {
        HypAPI.getPlayer(username).then((data) => {
          this.send(`/gc Info for ${username} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${data.stats.bedwars.finalKills}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
        })
      }
      else if (player == undefined) {
        HypAPI.getPlayer(username).then((data) => {
          this.send(`/gc Info for ${username} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${data.stats.bedwars.finalKills}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
        })
      }
      else if (player == 'help') {
        this.send(`/gc Usage: !bw <player> [mode] - Modes: solo, doubles, threes, fours, 4v4, castle, overall - DREAM MODES ARE COMMING - ${makeid(10)}`)
      }
      else {
        HypAPI.getPlayer(player).then((data) => {
            // check the ammount of splits in the message
            if(message.split(' ').length == 3) {
              const mode = message.split(' ')[2]
              if(mode == 'solo' ||
                mode == 'doubles' ||
                mode == 'threes' ||
                mode == 'fours' ||
                mode == '4v4' ||
                mode == 'castle') {
                  this.send(`/gc Info for ${player} in mode ${mode} - FKDR: ${data.stats.bedwars[mode].finalKDRatio}, Winstreak: ${data.stats.bedwars[mode].winstreak}, Wins: ${data.stats.bedwars[mode].wins}, WLR ${data.stats.bedwars[mode].WLRatio}, BLR ${data.stats.bedwars[mode].beds.BLRatio}, Finals: ${data.stats.bedwars[mode].finalKills}, Beds: ${data.stats.bedwars[mode].beds.broken} - ${makeid(10)}`)
              }
              else if (mode == 'overall') {
                this.send(`/gc Info for ${player} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${data.stats.bedwars.finalKills}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
              }
              else if (mode == 'dream') {
                this.send(`/gc Invalid type! Valid Types: [voidless, lucky, armed, rush, ultimate] - ${makeid(10)}`)
              }
              else {
                this.send(`/gc Invalid mode! Valid Modes: [solo, double, threes, fours, 4v4, castle, overall, dream] - ${makeid(10)}`)
              }
            }
            else {
              this.send(`/gc Info for ${player} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${data.stats.bedwars.finalKills}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
            }
        }).catch((error) => {
          this.send(`/gc ${player} does not exist! - ${makeid(10)}`)
          console.log(`error was caused by ${username}`)
          console.log(error)
        })
      }
    } else {
      this.send(`/gc You are Blacklisted! - ${makeid(10)}`)
    }
    }
    else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = BedwarsCommand


