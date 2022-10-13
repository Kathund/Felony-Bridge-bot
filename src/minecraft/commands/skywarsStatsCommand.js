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

class SkywarsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'sw'
    this.aliases = ['skywars']
    this.description = 'Look up your skywars stats'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    // get the player's stats
    HypAPI.getPlayer(player).then((data) => {
        // check the ammount of splits in the message
        if (message.split(' ').length == 4) {
          // get the mode from the third word of the message
          const mode = message.split(' ')[2]
          // check if the mode is solo
          if (mode == 'solo' || mode == 'team') {
            const type = message.split(' ')[3]
            if (type == 'overall' || type == 'normal' || type == 'insane') {
              this.send(`/gc info for ${player} in ${mode} ${type} - Kills: ${data.stats.skywars[mode][type].kills} Wins: ${data.stats.skywars[mode][type].wins} KD: ${data.stats.skywars[mode][type].KDRatio} WLR: ${data.stats.skywars[mode][type].WLRatio} - ${makeid(10)}`)
            }
            else {
              this.send(`/gc info for ${player} in ${mode} overall - Kills: ${data.stats.skywars[mode].overall.kills} Wins: ${data.stats.skywars[mode].overall.wins} KD: ${data.stats.skywars[mode].overall.KDRatio} WLR: ${data.stats.skywars[mode].overall.WLRatio} - ${makeid(10)}`)
            }
          }
          else {
            this.send(`/gc Invalid mode! Valid Modes: [solo, team, ranked, mega] - ${makeid(10)}`)
          }
        }
        else if (message.split(' ').length == 3) {
          // get the mode from the third word of the message
          const mode = message.split(' ')[2]
          if (mode == 'ranked') {
            this.send(`/gc Ranked is no longer supported - ${makeid(10)}`)
          }
          else if (mode == 'mega') {
            this.send(`/gc info for ${player} in ${mode} - Kills: ${data.stats.skywars[mode].overall.kills} Wins: ${data.stats.skywars[mode].overall.wins} KD: ${data.stats.skywars[mode].overall.KDRatio} WLR: ${data.stats.skywars[mode].overall.WLRatio} - ${makeid(10)}`)
          }
          else {
            this.send(`/gc Invalid mode! Valid Modes: [solo, team, ranked, mega] - ${makeid(10)}`)
          }
        }
        else if (message.split(' ').length == 2) {
          // send the stats
          this.send(`/gc Info for ${player} - Level: ${data.stats.skywars.level}, Kills: ${data.stats.skywars.kills} Wins: ${data.stats.skywars.wins} KD: ${data.stats.skywars.KDRatio} WLR: ${data.stats.skywars.WLRatio} - ${makeid(10)}`)
        }
    }).catch((error) => {
      this.send(`/gc ${player} is not a valid player!`)
      console.log(error)
    })
  }
  else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = SkywarsCommand


