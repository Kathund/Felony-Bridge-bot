
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

 
onCommand(username, message) {
  if (check != 'disabled') {
    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    if (player == 'help') {
        this.send(`/gc Usage: !duels <player> [mode] - Modes: [parkour, bowspleef, arena, megawalls, sumo, classic, combo, blitz, nodebuff, bow, boxing, uhc, op, skywars, bridge] - ${makeid(10)}`)
    }
    // get the player's stats
    HypAPI.getPlayer(player).then((data) => {
      // check the ammount of splits in the message
      if (message.split(' ').length == 3) {
        // get the mode from the third word of the message
        const mode = message.split(' ')[2]
        // check the mode against the valid modes
        if (mode == 'parkour'|| mode == 'bowspleef' || mode == 'arena' || mode == 'megawalls' || mode == 'sumo' || mode == 'classic' || mode == 'combo' || mode == 'blitz' || mode == 'nodebuff' || mode == 'bow') {
          this.send(`/gc info for ${player} in ${mode}: Division: ${data.stats.duels[mode].division} Kills: ${data.stats.duels[mode].kills} Wins: ${data.stats.duels[mode].wins} KD: ${data.stats.duels[mode].KDRatio} WLR: ${data.stats.duels[mode].WLRatio} - ${makeid(10)}`)
        }
        else if (mode == 'uhc' || mode == 'op' || mode == 'skywars' || mode == 'bridge') {
          this.send(`/gc info for ${player} in ${mode}: Division: ${data.stats.duels[mode].division} Kills: ${data.stats.duels[mode].overall.kills} Wins: ${data.stats.duels[mode].overall.wins} KD: ${data.stats.duels[mode].overall.KDRatio} WLR: ${data.stats.duels[mode].overall.WLRatio} - ${makeid(10)}`)
        }
        else if (mode == 'boxing') {
          this.send(`/gc info for ${player} in ${mode}: Division: ${data.stats.duels[mode].division} Kills: ${data.stats.duels[mode].kills} Wins: ${data.stats.duels[mode].wins} - ${makeid(10)}`)
        }
        else {
          this.send(`/gc Invalid mode! Valid Modes: [parkour, bowspleef, arena, megawalls, sumo, classic, combo, blitz, nodebuff, bow, boxing, uhc, op, skywars, bridge] - ${makeid(10)}`)
        }
      }
      else {
        this.send(`/gc info for ${player} - division: ${data.stats.duels.division} Kills: ${data.stats.duels.kills} Wins: ${data.stats.duels.wins} KD: ${data.stats.duels.KDRatio} WLR: ${data.stats.duels.WLRatio} - ${makeid(10)}`)
      }
    }).catch((error) => {
      this.send(`/gc ${player} does not exist! - ${makeid(10)}`)
      console.log(`error was caused by ${username}`)
      console.log(error)
    })
  } else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = duelCommand


