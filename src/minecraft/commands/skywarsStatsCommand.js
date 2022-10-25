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
    if (player == 'help') {
      this.send(`/gc Usage: !sw <player> [mode] - Modes: solo, team, ranked, mega - look up your skywars stats - ${makeid(10)}`)
    }
      if (player == 'solo' || player == 'temas') {
        HypAPI.getPlayer(username).then((data) => {
          var overallKills = data.stats.skywars[mode].normal.kills + data.stats.skywars[mode].insnae.kills
          var overallDeaths = data.stats.skywars[mode].normal.deaths + data.stats.skywars[mode].insane.deaths
          var overallWins = data.stats.skywars[mode].normal.wins + data.stats.skywars[mode].insane.wins
          var overallLosses = data.stats.skywars[mode].normal.losses + data.stats.skywars[mode].insane.losses
          var overallKDR = overallWins / overallDeaths
          var overallWLR = overallWins / overallLosses
          this.send(`/gc ${username}'s Skywars Stats in mode ${player} - Kills: ${overallKills} KD ${overallKDR} Wins: ${overallWins} WLR ${overallWLR} - ${makeid(10)}`)
        })
      }
      else if (player == 'mega') {
        HypAPI.getPlayer(username).then((data) => {
          this.send(`/gc ${username}'s Skywars Stats in mode ${player} - Kills: ${data.stats.skywars.mega.overall.kills} KD ${data.stats.skywars.mega.overall.KDRatio} Wins: ${data.stats.skywars.mega.overall.wins} WLR ${data.stats.skywars.mega.overall.WLRatio} - ${makeid(10)}`)
        })
      }
      else if (player == 'overall' || player == undefined) {
        HypAPI.getPlayer(username).then((data) => {
          this.send(`/gc ${username}'s skywars stats - Kills: ${data.stats.skywars.kills} KD ${data.stats.skywars.KDRatio} Wins: ${data.stats.skywars.wins} WLR ${data.stats.skywars.WLRatio} - ${makeid(10)}`)
        })
      }
      else if (player == 'ranked') {
        this.send(`/gc Ranked isn't supported anymore`)
      }
      else {
        const mode = message.split(' ')[2]
        HypAPI.getPlayer(player).then((data) => {
          if (mode == 'solo' || mode == 'team') {
            var overallKills = data.stats.skywars[mode].normal.kills + data.stats.skywars[mode].insane.kills
            var overallDeaths = data.stats.skywars[mode].normal.deaths + data.stats.skywars[mode].insane.deaths
            var overallWins = data.stats.skywars[mode].normal.wins + data.stats.skywars[mode].insane.wins
            var overallLosses = data.stats.skywars[mode].normal.losses + data.stats.skywars[mode].insane.losses
            var overallKDR = overallWins / overallDeaths
            var overallWLR = overallWins / overallLosses
            this.send(`/gc ${player}'s Skywars Stats in mode ${mode} - Kills: ${overallKills} KD ${overallKDR} Wins: ${overallWins} WLR ${overallWLR} - ${makeid(10)}`)
          }
          else if (mode == 'mega') {
            this.send(`/gc ${player}'s Skywars Stats in mode ${mode} - Kills: ${data.stats.skywars.mega.overall.kills} KD ${data.stats.skywars.mega.overall.KDRatio} Wins: ${data.stats.skywars.mega.overall.wins} WLR ${data.stats.skywars.mega.overall.WLRatio} - ${makeid(10)}`)
          }
          else if (mode == 'overall' || mode == undefined) {
            this.send(`/gc ${player}'s skywars stats - Kills: ${data.stats.skywars.kills} KD ${data.stats.skywars.KDRatio} Wins: ${data.stats.skywars.wins} WLR ${data.stats.skywars.WLRatio} - ${makeid(10)}`)
          }
          else if (mode == 'ranked') {
            this.send(`/gc Ranked isn't supported anymore`)
          }
          else {
            this.send(`/gc Usage: !sw <player> [mode] - Modes: solo, team, ranked, mega - look up your skywars stats - ${makeid(10)}`)
          }
        })
      }
    }
    else {
      this.send(`/gc This command is disabled`)
    }
  }
}
module.exports = SkywarsCommand


