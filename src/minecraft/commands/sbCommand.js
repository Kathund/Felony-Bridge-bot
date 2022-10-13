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

class sbCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'sb'
    this.aliases = ['skyblock']
    this.description = 'Look up your skyblock stats'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    if (username == 'Axth' || username == 'oTod' || username == 'SpookyKath' || username == 'Udderly_Cool' || username == 'hitlast' || username == 'SpookyHitlast') {
      // get the player name in the second word of the message
      const player = message.split(' ')[1]
      const profile = message.split(' ')[2]
      // get the player's stats
      HypAPI.getSkyblockMember(player).then((data) => {
          // console log the data
          console.log(data)
          this.send(`/gc ${data.fairySouls}`)
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

module.exports = sbCommand


