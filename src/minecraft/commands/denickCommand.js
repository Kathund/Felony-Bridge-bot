
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

function Formatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "b" },
    { value: 1e12, symbol: "t" }
  ];
  const rx = /.0+$|(.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
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
      const subcommand = message.split(' ')[2]
      const player = message.split(' ')[1]
        if (player == 'help') {
            this.send(`/gc Usage: !denick <player> - ${makeid(10)}`)
        }
        else {
          fetch(`http://api.antisniper.net/denick?key=976e7ac3-b818-4442-ae92-c452dfa8b8f1&nick=${player}`).then((res) => {
            res.json().then((aaa) => {
              if (aaa.player == null) {
                this.send(`/gc ${player} is not in the database! TRY AGAIN in 5 or so mins - ${makeid(10)}`)
              }
              const a = (aaa.player.ign)
              if (subcommand == 'duels') {
                HypAPI.getPlayer(a).then((data) => {
                    var kills = data.stats.dules.kills
                    var kills = kills.toFixed(0);
                    const kills = Formatter(kills,2)
                    var wins = data.stats.duels.wins
                    var wins = wins.toFixed(0);
                    const wins = Formatter(wins,2)                   
                  this.send(`/gc Denicked - ${player} is ${a} - Division: ${data.stats.duels.division} Kills: ${kills} Wins: ${wins} KD: ${data.stats.duels.KDRatio} WLR: ${data.stats.duels.WLRatio} - ${makeid(10)}`)
                })
              }
              else {
                HypAPI.getPlayer(a).then((data) => {
                    var finals = data.stats.bedwars.finalKills
                    var finals = finals.toFixed(0);
                    const finals = Formatter(finals,2)
                    var wins = data.stats.bedwars.wins
                    var wins = wins.toFixed(0);
                    const wins = Formatter(wins,2)
                  this.send(`/gc Denicked - ${player} is ${a} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
                }).catch(err => {
                  console.log(`error was caused by ${username}`)
                  console.log(err)
                  this.send(`/gc ${player} is not in the database! - ${makeid(10)}`)
                })
              }
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


