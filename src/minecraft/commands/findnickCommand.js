
const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel.js')
const check = 'enabled'
const fetch = (...args) => import('node-fetch').then(({
	default: fetch
}) => fetch(...args)).catch(err => console.log(err));

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

class findNickCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'findnick'
    this.aliases = ['fnick', 'whonick']
    this.description = 'find a nick of a player'
  }

 
  onCommand(username, message) {
    if (check != 'disabled') {
    // if (username == 'SpookyKath') {
      const subcommand = message.split(' ')[2]
      const player = message.split(' ')[1]
        if (player == 'help') {
            this.send(`/gc Usage: !findnick <player> - ${makeid(10)}`)
        }
        else {
          fetch(`https://api.antisniper.net/findnick?key=976e7ac3-b818-4442-ae92-c452dfa8b8f1&name=${player}`).then((res) => {
            res.json().then((data) => {
                this.send(`/gc ${data.player.ign} is nicked as ${data.player.nick} - ${makeid(10)}`)
            }).catch(err => {
                console.log(err)
                this.send(`/gc ${player} is not nicked or not in the database - ${makeid(10)}`)
            })
          })
        }
      }
      else {
        this.send(`/gc This command is disabled! - ${makeid(10)}`)
      }
  }
}

module.exports = findNickCommand


