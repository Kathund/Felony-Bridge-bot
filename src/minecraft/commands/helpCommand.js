const MinecraftCommand = require('../../contracts/MinecraftCommand')
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

class HelpCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'help'
    this.aliases = ['h']
    this.description = 'Help'
  }

  onCommand(username, message) {
    if (check != 'disabled') {
      // get subcommand from message
      const subcommand = message.split(' ')[1]
      if (subcommand == 'api') {
        this.send(`/gc Usage: !api - will show how many times the bot has been used - ${makeid(10)}`)
      }
      else if (subcommand == 'bedwars') {
        this.send(`/gc Usage: !bedwars <player> [mode] - will show the player's bedwars stats - ${makeid(10)}`)
      }
      else if (subcommand == 'denick') {
        this.send(`/gc Usage: !denick <nick> - will denick someone - ${makeid(10)}`)
      }
      else if (subcommand == 'duels') {
        this.send(`/gc Usage: !duels <player> [mode] - will show the player's duels stats - ${makeid(10)}`)
      }
      else if (subcommand == 'findnick') {
        this.send(`/gc Usage: !findnick <player> - will find the nick of a player - ${makeid(10)}`)
      }
      else if (subcommand == 'guild') {
        this.send(`/gc Usage: !guild <guild> - will show the guild's stats - ${makeid(10)}`)
      }
      else if (subcommand == 'go') {
        this.send(`/gc Usage: !go <player in guild> - will show the player's guild stats - ${makeid(10)}`)
      }
      else if (subcommand == 'help') {
        this.send(`/gc Usage: !help [command] - ${makeid(10)}`)
      }
      else if (subcommand == 'player') {
        this.send(`/gc Usage: !player <player> - will show the player's stats - ${makeid(10)}`)
      }
      else if (subcommand == 'skywars') {
        this.send(`/gc Usage: !skywars <player> [mode] - will show the player's skywars stats - ${makeid(10)}`)
      }
      else if (subcommand == 'watchdog') {
        this.send(`/gc Usage: !watchdog - will show the watchdog info - ${makeid(10)}`)
      }
      else {
        this.send(`/gc Current Commands: !api, !bedwars, !denick, !duels, !findnick, !guild, !go, !help, !player, !skywars, !watchdog - EVERY command has a sub help menu eg: !help bedwars - <> are required and [] are not required - ${makeid(10)}`)
      }
    } else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = HelpCommand
