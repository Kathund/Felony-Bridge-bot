
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

class winstreakCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'winstreak'
    this.aliases = ['ws']
    this.description = 'find the ESTIMATED winstreak of a player'
  }

 
  onCommand(username, message) {
    if (check != 'disabled') {
    // if (username == 'SpookyKath') {
      const subcommand = message.split(' ')[2]
      const player = message.split(' ')[1]
        if (player == 'help') {
            this.send(`/gc Usage: !ws <player> - ${makeid(10)}`)
        }
        else {
          fetch(`https://api.antisniper.net/winstreak?key=976e7ac3-b818-4442-ae92-c452dfa8b8f1&name=${player}`).then((res) => {
            res.json().then((data) => {
                this.send(`/gc Winstreak info for ${data.player.ign}: Api on: ${data.player.accurate} Overall: ${data.player.data.overall_winstreak} Solo: ${data.player.data.eight_one_winstreak} Doubles: ${data.player.data.eight_two_winstreak} Threes: ${data.player.data.four_three_winstreak} Fours: ${data.player.data.four_four_winstreak} 4v4: ${data.player.data.two_four_winstreak} - ${makeid(10)}`)
            }).catch(err => {
                console.log(err)
                this.send(`/gc ${player} is not a valid player - ${makeid(10)}`)
            })
          })
        }
      }
      else {
        this.send(`/gc This command is disabled! - ${makeid(10)}`)
      }
  }
}

module.exports = winstreakCommand


