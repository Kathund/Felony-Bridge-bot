// TODO clear up .catch line 46 and 49

// TODO fix ur brain
// C:\Users\gayass\OneDrive\Documents\GitHub\Felony-Bridge-bot\node_modules\hypixel-api-reborn\src\API\getPlayer.js:7
//   if (!query) throw new Error(Errors.NO_NICKNAME_UUID);
//                     ^

// Error: [hypixel-api-reborn] No nickname or uuid specified.
//     at Object.module.exports (C:\Users\gayass\OneDrive\Documents\GitHub\Felony-Bridge-bot\node_modules\hypixel-api-reborn\src\API\getPlayer.js:7:21)
//     at Client.Client.<computed> [as getPlayer] (C:\Users\gayass\OneDrive\Documents\GitHub\Felony-Bridge-bot\node_modules\hypixel-api-reborn\src\Client.js:37:26)
//     at C:\Users\gayass\OneDrive\Documents\GitHub\Felony-Bridge-bot\src\minecraft\commands\denickCommand.js:41:20
//     at runMicrotasks (<anonymous>)
//     at processTicksAndRejections (node:internal/process/task_queues:96:5)

const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel')
// const HypAPI = new HypixelAPIReborn.Client('cc4cde34-734e-4b33-9bc6-51c65006ccff')
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


