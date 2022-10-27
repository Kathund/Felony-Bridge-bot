
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

class duelCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'duels'
    this.aliases = ['duel']
    this.description = 'Look up your duels stats'
  }

  // TODO REWITE THIS COMMAND

onCommand(username, message) {
  if (check != 'disabled') {
    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    const subcommand = message.split(' ')[2]
    if (player == 'help') {
        this.send(`/gc Usage: !duels <player> [mode] - Modes: [parkour, bowspleef, arena, megawalls, sumo, classic, combo, blitz, nodebuff, bow, boxing, uhc, op, skywars, bridge] - ${makeid(10)}`)
    }
    else if (player == 'parkour'|| player == 'bowspleef' || player == 'arena' || player == 'megawalls' || player == 'sumo' || player == 'classic' || player == 'combo' || player == 'blitz' || player == 'nodebuff' || player == 'bow') {
      HypAPI.getPlayer(username).then((data) => {
        this.send(`/gc info for ${username} in ${player}: Division: ${data.stats.duels[subcommand].division} Kills: ${data.stats.duels[subcommand].kills} Wins: ${data.stats.duels[subcommand].wins} KD: ${data.stats.duels[subcommand].KDRatio} WLR: ${data.stats.duels[subcommand].WLRatio} - ${makeid(10)}`)
      })
    }
    else if (player == 'uhc' || player == 'op' || player == 'skywars' || player == 'bridge') {
      HypAPI.getPlayer(username).then((data) => {
        this.send(`/gc info for ${player} in ${subcommand}: Division: ${data.stats.duels[subcommand].division} Kills: ${data.stats.duels[subcommand].kills} Wins: ${data.stats.duels[subcommand].wins} KD: ${data.stats.duels[subcommand].KDRatio} WLR: ${data.stats.duels[subcommand].WLRatio} - ${makeid(10)}`)
      })
    }
    else if (player == 'boxing') {
      HypAPI.getPlayer(username).then((data) => {
        this.send(`/gc info for ${player} in ${subcommand}: Division: ${data.stats.duels[subcommandvvvvvv].division} Kills: ${data.stats.duels[subcommand].kills} Wins: ${data.stats.duels[subcommand].wins} KD: ${data.stats.duels[subcommand].KDRatio} WLR: ${data.stats.duels[subcommand].WLRatio} - ${makeid(10)}`)
      })
    }
    else if (player == 'overall' || player == undefined) {
      HypAPI.getPlayer(username).then((data) => {
        this.send(`/gc info for ${username} in overall: Division: ${data.stats.duels.overall.division} Kills: ${data.stats.duels.overall.kills} Wins: ${data.stats.duels.overall.wins} KD: ${data.stats.duels.overall.KDRatio} WLR: ${data.stats.duels.overall.WLRatio} - ${makeid(10)}`)
      })
    }
    else {
      HypAPI.getPlayer(player).then((data) => {
        if (subcommand == 'parkour'|| subcommand == 'bowspleef' || subcommand == 'arena' || subcommand == 'megawalls' || subcommand == 'sumo' || subcommand == 'classic' || subcommand == 'combo' || subcommand == 'blitz' || subcommand == 'nodebuff' || subcommand == 'bow') {
          this.send(`/gc info for ${player} in ${subcommand}: Division: ${data.stats.duels[subcommand].division} Kills: ${data.stats.duels[subcommand].kills} Wins: ${data.stats.duels[subcommand].wins} KD: ${data.stats.duels[subcommand].KDRatio} WLR: ${data.stats.duels[subcommand].WLRatio} - ${makeid(10)}`)
        }
        else if (subcommand == 'uhc' || subcommand == 'op' || subcommand == 'skywars' || subcommand == 'bridge') {
          this.send(`/gc info for ${player} in ${subcommand}: Division: ${data.stats.duels[subcommand].division} Kills: ${data.stats.duels[subcommand].kills} Wins: ${data.stats.duels[subcommand].wins} KD: ${data.stats.duels[subcommand].KDRatio} WLR: ${data.stats.duels[subcommand].WLRatio} - ${makeid(10)}`)
        }
        else if (subcommand == 'boxing') {
          this.send(`/gc info for ${player} in ${subcommand}: Division: ${data.stats.duels[subcommand].division} Kills: ${data.stats.duels[subcommand].kills} Wins: ${data.stats.duels[subcommand].wins} KD: ${data.stats.duels[subcommand].KDRatio} WLR: ${data.stats.duels[subcommand].WLRatio} - ${makeid(10)}`)
        }
        else if (subcommand == 'overall' || subcommand == undefined) {
          this.send(`/gc info for ${player} in overall: Division: ${data.stats.duels.overall.division} Kills: ${data.stats.duels.overall.kills} Wins: ${data.stats.duels.overall.wins} KD: ${data.stats.duels.overall.KDRatio} WLR: ${data.stats.duels.overall.WLRatio} - ${makeid(10)}`)
        }
      })
    }
  } else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = duelCommand


