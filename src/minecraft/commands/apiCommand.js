const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel')
// const HypAPI = new HypixelAPIReborn.Client('cc4cde34-734e-4b33-9bc6-51c65006ccff')
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

class apiCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'api'
    this.aliases = ['']
    this.description = 'Check the amount of requests the api has used'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    HypAPI.getKeyInfo().then((data) => {
      this.send(`/gc The amount of times the api key has been used: ${data.totalRequests} - ${makeid(10)}`)
    })
  }
  else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = apiCommand


