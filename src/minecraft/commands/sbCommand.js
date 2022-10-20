// TODO once they update the package u can work on this dumb ass fucking shit or go die in in a hole
// TODO you are useless and u should die in a fucking hole 

const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel.js')
const check = 'test'
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

class sbCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'sb'
    this.aliases = ['skyblock']
    this.description = 'Look up your skyblock stats'
  }

 
onCommand(username, message) {
  if (username == 'SpookyZom' || username == 'Axth' || username == 'oTod' || username == 'SpookyKath' || username == 'SpookyBurger' || username == 'SpookyHitlast') {    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    const profile = message.split(' ')[2]
    const subcommand = message.split(' ')[3]
    if (subcommand == 'slayer') {
      fetch(`https://sky.shiiyu.moe/api/v2/slayers/${player}/${profile}`).then((res) => {
        res.json().then((data) => {
          console.log(data)
          this.send(`/gc Zombie: ${data.slayers.zombie.level.currentLevel} Wolf: ${data.slayers.wolf.level.currentLevel} Spider: ${data.slayers.spider.level.currentLevel} Enderman: ${data.slayers.enderman.level.currentLevel} Blaze: ${data.slayers.blaze.level.currentLevel} - ${makeid(10)}`)
        })
      })
    }
    // else if (subcommand ==) {}
  }
  else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = sbCommand


