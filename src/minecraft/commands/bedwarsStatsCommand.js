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

class BedwarsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'bw'
    this.aliases = ['bedwars']
    this.description = 'Look up your Bedwars stats'
  }

  // TODO rewrite this command u fucking dumb dumb
 
  onCommand(username, message) {
    if (check != 'disabled') { 
      // get the player name in the second word of the message
      const player = message.split(' ')[1]
      // get the player's stats
      if (player == 'solo' || player == 'doubles' || player == 'threes' || player == 'fours' || player == '4v4') {
        HypAPI.getPlayer(username).then((hypixelAPIData) => {
          var finals = hypixelAPIData.stats.bedwars[player].finalKills
          var wins = hypixelAPIData.stats.bedwars[player].wins
          if (hypixelAPIData.stats.bedwars[player].winstreak == 0) {
            fetch(`https://api.antisniper.net/winstreak?key=976e7ac3-b818-4442-ae92-c452dfa8b8f1&name=${username}`).then((res) => {
              res.json().then((antisniperAPIInfo) => {
                if (player == 'solo') {
                  const winstreak = antisniperAPIInfo.player.data.eight_one_winstreak
                  this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${hypixelAPIData.stats.bedwars[player].finalKDRatio}, ESTIMATED Winstreak: ${winstreak}, Wins: ${wins}, WLR ${hypixelAPIData.stats.bedwars[player].WLRatio}, BLR ${hypixelAPIData.stats.bedwars[player].beds.BLRatio}, Finals: ${finals}, Beds: ${hypixelAPIData.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
                }
                else if (player == 'doubles') {
                  const winstreak = antisniperAPIInfo.player.data.eight_two_winstreak
                  this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${hypixelAPIData.stats.bedwars[player].finalKDRatio}, ESTIMATED Winstreak: ${winstreak}, Wins: ${wins}, WLR ${hypixelAPIData.stats.bedwars[player].WLRatio}, BLR ${hypixelAPIData.stats.bedwars[player].beds.BLRatio}, Finals: ${finals}, Beds: ${hypixelAPIData.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
                }
                else if (player == 'threes') {
                  const winstreak = antisniperAPIInfo.player.data.four_three_winstreak
                  this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${hypixelAPIData.stats.bedwars[player].finalKDRatio}, ESTIMATED Winstreak: ${winstreak}, Wins: ${wins}, WLR ${hypixelAPIData.stats.bedwars[player].WLRatio}, BLR ${hypixelAPIData.stats.bedwars[player].beds.BLRatio}, Finals: ${finals}, Beds: ${hypixelAPIData.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
                }
                else if (player == 'fours') {
                  const winstreak = antisniperAPIInfo.player.data.four_four_winstreak
                  this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${hypixelAPIData.stats.bedwars[player].finalKDRatio}, ESTIMATED Winstreak: ${winstreak}, Wins: ${wins}, WLR ${hypixelAPIData.stats.bedwars[player].WLRatio}, BLR ${hypixelAPIData.stats.bedwars[player].beds.BLRatio}, Finals: ${finals}, Beds: ${hypixelAPIData.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
                }
                else if (player == '4v4') {
                  const winstreak = antisniperAPIInfo.player.data.four_two_winstreak
                  this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${hypixelAPIData.stats.bedwars[player].finalKDRatio}, ESTIMATED Winstreak: ${winstreak}, Wins: ${wins}, WLR ${hypixelAPIData.stats.bedwars[player].WLRatio}, BLR ${hypixelAPIData.stats.bedwars[player].beds.BLRatio}, Finals: ${finals}, Beds: ${hypixelAPIData.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
                }
              })
            })
          } else {
            this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${hypixelAPIData.stats.bedwars[player].finalKDRatio}, Winstreak: ${hypixelAPIData.stats.bedwars[player].winstreak}, Wins: ${wins}, WLR ${hypixelAPIData.stats.bedwars[player].WLRatio}, BLR ${hypixelAPIData.stats.bedwars[player].beds.BLRatio}, Finals: ${finals}, Beds: ${hypixelAPIData.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
          }
        })
      }
      else if (player == 'voidless' || player == 'lucky' || player == 'armed' || player == 'rush' || player == 'ultimate') {
        HypAPI.getPlayer(username).then((data) => {
          var overallWins = data.stats.bedwars.dream[player].doubles.wins + data.stats.bedwars.dream[player].fours.wins
          var overallLosses = data.stats.bedwars.dream[player].doubles.losses + data.stats.bedwars.dream[player].fours.losses
          var overallFinals = data.stats.bedwars.dream[player].doubles.finalKills + data.stats.bedwars.dream[player].fours.finalKills
          var overallFinalDeath = data.stats.bedwars.dream[player].doubles.finalDeaths + data.stats.bedwars.dream[player].fours.finalDeaths
          var overallBeds = data.stats.bedwars.dream[player].doubles.beds.broken + data.stats.bedwars.dream[player].fours.beds.broken
          var overallBedsLost = data.stats.bedwars.dream[player].doubles.beds.lost + data.stats.bedwars.dream[player].fours.beds.lost
          var overallBLR = overallBeds / overallBedsLost
          var overallFKDR = overallFinals / overallFinalDeath
          var overallWLR = overallWins / overallLosses
          this.send(`/gc Info for ${username} in ${player} - Wins: ${overallWins} WLR: ${overallWLR} Finals: ${overallFinals} FKDR: ${overallFKDR} Beds: ${overallBeds} BLR ${overallBLR}`)
        })
      }
      else if (player == 'overall' || player == undefined) {
        HypAPI.getPlayer(username).then((hypixelAPIData) => {
          var finals = hypixelAPIData.stats.bedwars.finalKills
          var wins = hypixelAPIData.stats.bedwars.wins
          if (hypixelAPIData.stats.bedwars.winstreak == 0) {
            fetch(`https://api.antisniper.net/winstreak?key=976e7ac3-b818-4442-ae92-c452dfa8b8f1&name=${username}`).then((res) => {
              res.json().then((antisniperAPIData) => {
              const winstreak = antisniperAPIData.player.data.overall_winstreak
              this.send(`/gc Info for ${username}- FKDR: ${hypixelAPIData.stats.bedwars.finalKDRatio}, ESTIMATED Winstreak: ${winstreak}, Wins: ${wins}, WLR ${hypixelAPIData.stats.bedwars.WLRatio}, BLR ${hypixelAPIData.stats.bedwars.beds.BLRatio}, Finals: ${finals}, Beds: ${hypixelAPIData.stats.bedwars.beds.broken} - ${makeid(10)}`)  
              })
            })
          }
        })
      }
      else if (player == 'help') {
        this.send(`/gc Usage: !bw <player> [mode] - Modes: solo, doubles, threes, fours, 4v4, castle, overall - DREAM MODES ARE COMMING - ${makeid(10)}`)
      }
      else {
        HypAPI.getPlayer(player).then((data) => {
            // check the ammount of splits in the message
            if(message.split(' ').length == 3) {
              const mode = message.split(' ')[2]
              if(mode == 'solo' || mode == 'doubles' || mode == 'threes' || mode == 'fours' || mode == '4v4' || mode == 'castle') {
                  var finals = data.stats.bedwars[mode].finalKills
                  var wins = data.stats.bedwars[mode].wins
                  this.send(`/gc Info for ${player} in mode ${mode} - FKDR: ${data.stats.bedwars[mode].finalKDRatio}, Winstreak: ${data.stats.bedwars[mode].winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars[mode].WLRatio}, BLR ${data.stats.bedwars[mode].beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars[mode].beds.broken} - ${makeid(10)}`)
              }
              else if (mode == 'overall') {
                var finals = data.stats.bedwars.finalKills
                var wins = data.stats.bedwars.wins
              this.send(`/gc Info for ${player} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
              }
              else if (mode == 'dream') {
                this.send(`/gc To use dreams just enter the mode! Valid Modes: [voidless, lucky, armed, rush, ultimate] - ${makeid(10)}`)
              }
              else if (mode == 'voidless' || mode == 'lucky' || mode == 'armed' || mode == 'rush' || mode == 'ultimate') {
                var overallWins = data.stats.bedwars.dream[mode].doubles.wins + data.stats.bedwars.dream[mode].fours.wins
                var overallLosses = data.stats.bedwars.dream[mode].doubles.losses + data.stats.bedwars.dream[mode].fours.losses
                var overallFinals = data.stats.bedwars.dream[mode].doubles.finalKills + data.stats.bedwars.dream[mode].fours.finalKills
                var overallFinalDeath = data.stats.bedwars.dream[mode].doubles.finalDeaths + data.stats.bedwars.dream[mode].fours.finalDeaths
                var overallBeds = data.stats.bedwars.dream[mode].doubles.beds.broken + data.stats.bedwars.dream[mode].fours.beds.broken
                var overallBedsLost = data.stats.bedwars.dream[mode].doubles.beds.lost + data.stats.bedwars.dream[mode].fours.beds.lost
                var overallBLR = overallBeds / overallBedsLost
                var overallFKDR = overallFinals / overallFinalDeath
                var overallWLR = overallWins / overallLosses
                this.send(`/gc Info for ${player} in ${mode} - Wins: ${overallWins} WLR: ${overallWLR} Finals: ${overallFinals} FKDR: ${overallFKDR} Beds: ${overallBeds} BLR ${overallBLR}`)
              }
              else {
                this.send(`/gc Invalid mode! Valid Modes: [solo, double, threes, fours, 4v4, castle, overall, voidless, lcuky, armed, rush, ultimate] - ${makeid(10)}`)
              }
            }
            else {
              this.send(`/gc Info for ${player} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${data.stats.bedwars.wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${data.stats.bedwars.finalKills}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
            }
        }).catch((error) => {
          this.send(`/gc ${player} does not exist! - ${makeid(10)}`)
          console.log(`error was caused by ${username}`)
          console.log(error)
        })
      }
    }
    else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = BedwarsCommand


