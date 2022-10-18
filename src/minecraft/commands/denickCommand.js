
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

class DenickCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'denick'
    this.aliases = ['unnick']
    this.description = 'denick a player'
  }

 
  onCommand(username, message) {
    if (check != 'disabled') {
        // get the player name in the second word of the message
        const player = message.split(' ')[1]
        if (player == 'help') {
            this.send(`/gc Usage: !denick <player> - ${makeid(10)}`)
        }
        else {
          fetch(`http://api.antisniper.net/denick?key=976e7ac3-b818-4442-ae92-c452dfa8b8f1&nick=${player}`).then((res) => {
            res.json().then((aaa) => {
              if (aaa.player == null) {
                this.send(`/gc ${player} is not in the database! - ${makeid(10)}`)
              }
              const a = (aaa.player.ign)
              HypAPI.getPlayer(a).then((data) => {
                this.send(`/gc Denicked - ${player} is ${a} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${data.stats.bedwars.finalKills}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
            }).catch(err => {
              console.log(`error was caused by ${username}`)
              console.log(err)
              this.send(`/gc ${player} is not in the database! - ${makeid(10)}`)
            })
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }
      }
      else {
        this.send(`/gc This command is disabled! - ${makeid(10)}`)
      }
  }
}

module.exports = DenickCommand


