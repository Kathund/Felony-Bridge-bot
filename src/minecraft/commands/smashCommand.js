
const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel')
// const HypAPI = new HypixelAPIReborn.Client('cc4cde34-734e-4b33-9bc6-51c65006ccff')
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

class smashHerosCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'smashheros'
    this.aliases = ['smash', 'sh', 'smashhero']
    this.description = 'Look up your SMASH HERO stats'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    this.send(`/gc FUCK U ZOM I DID IT - ${makeid(10)}`)
    setTimeout(() => {
        this.send(`/gc ${username} how tf do u know this is a command - ${makeid(10)}`)
    }, 500);
  } else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = smashHerosCommand


