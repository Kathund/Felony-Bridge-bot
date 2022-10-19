
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

class watchdogCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'watchdog'
    this.aliases = ['wd']
    this.description = 'Shows watchdog stats'
  }

 
onCommand(username, message) {
    if (check != 'disabled') {
        // get the watchdog stats
        HypAPI.getWatchdogStats().then((data) => {
            this.send(`/gc Watchdog Stats: ${data.byWatchdogTotal} Staff Stats: ${data.byStaffTotal} - ${makeid(10)}`)
        }).catch((error) => {
          this.send(`/gc ${player} does not exist! - ${makeid(10)}`)
          console.log(`error was caused by ${username}`)
          console.log(error)
        })
  } else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = watchdogCommand


