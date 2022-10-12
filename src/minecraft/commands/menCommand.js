const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = new HypixelAPIReborn.Client('cc4cde34-734e-4b33-9bc6-51c65006ccff')
const check = 'disabled'

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

class men extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'men'
    this.aliases = ['mens']
    this.description = 'Look up your men'
  }

 
  onCommand(username, message) {
    if (check != 'disabled') {
      // get the player name in the second word of the message
      const player = message.split(' ')[1]
      // get the player's stats
      HypAPI.getPlayer('SpookyKath').then((data) => {
              console.log(data.stats.skywars)
      })
    }
    else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = men


