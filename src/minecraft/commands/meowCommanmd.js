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

    this.name = 'meow'
    this.aliases = ['uwu', 'owo']
    this.description = 'why am i doing this'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    const subcommand = message.split(' ')[1]
    if (subcommand == 'help') {
        this.send(`/gc Usage: !uwu - ${makeid(10)}`)
    }
    else {
        this.send(`/gc Meow! - ${makeid(10)}`)
        setTimeout(() => {
            this.send(`/g mute ${username} 1h`)
        }, 300);
    }
  }
  else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = meowCommand


