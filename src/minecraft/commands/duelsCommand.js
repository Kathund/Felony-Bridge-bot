// TODO once they update the package u can work on this dumb ass fucking shit or go die in in a hole
// TODO you are useless and u should die in a fucking hole 

const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = new HypixelAPIReborn.Client('cc4cde34-734e-4b33-9bc6-51c65006ccff')
const check = 'test'

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
    if (username == 'Axth' || username == 'oTod' || username == 'SpookyKath' || username == 'Udderly_Cool' || username == 'hitlast' || username == 'SpookyHitlast') {
      // get the player name in the second word of the message
      const player = message.split(' ')[1]
      // get the player's stats
      HypAPI.getPlayer(player).then((data) => {
        // check the ammount of splits in the message
        if (message.split(' ').length == 4) {
          // TODO fix 'Expression expected' error
          // TODO goto 48:9
          // get the mode from the third word of the message
          const mode = message.split(' ')[2]
          // check the mode against the valid modes
          if (mode == 'parkour'|| mode == 'boxing' || mode == 'bowspleef' || mode == 'arena' || mode == 'megawalls' || mode == 'sumo' || mode == 'classic' || mode == 'combo' || mode == 'blitz' || mode == 'nodebuff' || mode == 'bow') 
          // TODO using modes that have more then one type
          // TODO ignore support for them and just use overall
          // TODO list of modes 'uhc' 'op' 'skywars' 'bridge'
        }        

        this.send(`/gc info for ${player} - division: ${data.stats.duels.division} Kills: ${data.stats.duels.kills} Wins: ${data.stats.duels.wins} KD: ${data.stats.duels.KDRatio} WLR: ${data.stats.duels.WLRatio} - ${makeid(10)}`)
      }).catch((err) => {
        this.send(`/gc ${player} dose not exist! - ${makeid(10)}`)
        console.log(`error was caused by ${username}`)
        console.log(err)
      })
    }
    else { 
      this.send(`/gc You do not have access to this command! - ${makeid(10)}`)
    }
  }
  else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = duelCommand


