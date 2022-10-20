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

class men extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'men'
    this.aliases = ['mens']
    this.description = 'Look up your men'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    if (username == 'Axth' || username == 'oTod' || username == 'SpookyKath' || username == 'Udderly_Cool' || username == 'SpookyBurger' || username == 'SpookyHitlast') {
      const player = message.split(' ')[1]
      const profile = message.split(' ')[2]
      fetch(`https://sky.shiiyu.moe/api/v2/slayers/${player}/${profile}`).then((res) => {
        res.json().then((data) => {
          console.log(data)
          this.send(`/gc Zombie: ${data.slayers.zombie.level.currentLevel} Wolf: ${data.slayers.wolf.level.currentLevel} Spider: ${data.slayers.spider.level.currentLevel} Enderman: ${data.slayers.enderman.level.currentLevel} Blaze: ${data.slayers.blaze.level.currentLevel} - ${makeid(10)}`)
        })
      })
    }
    else { 
      this.send(`/gc You do not have access to this command! - ${makeid(10)}`)
    }
  }
  else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = men


