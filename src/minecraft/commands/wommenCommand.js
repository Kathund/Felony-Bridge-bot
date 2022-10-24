const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel.js')
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

class meowCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'women'
    this.aliases = []
    this.description = 'TEST COMMAND'
  }

 
onCommand(username, message) {
  if (username == 'SpookyKath') {
    const subcommand = message.split(' ')[1]
    if (subcommand == 'help') {
        this.send(`/gc Usage: FUKCO FF THIS IS MY TEST COMMAND - ${makeid(10)}`)
    }
    else {
        this.send(`/gc bye bye bot - ${makeid(10)}`)
        setTimeout(() => {
            const player = 'fduhguhfughufidghuifhdguhugfdhguidfhguifd'
            HypAPI.getPlayer(player).then((data) => {
                // console log the data
                console.log(data)
                })
        }, 300);
    }
  }
  else {
      this.send(`/gc fuck off this will crash the bot - ${makeid(10)}`)
    }
  }
}

module.exports = meowCommand


