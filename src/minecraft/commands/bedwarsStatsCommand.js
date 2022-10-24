const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel.js')
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

 
  onCommand(username, message) {
    if (check != 'disabled') {
      // get the player name in the second word of the message
      const player = message.split(' ')[1]
      // get the player's stats
      if (player == 'solo' || player == 'doubles' || player == 'threes' || player == 'fours' || player == '4v4') {
        HypAPI.getPlayer(username).then((data) => {
          var finals = data.stats.bedwars[player].finalKills
          var finals = finals.toFixed(0);
          const finals = Formatter(finals,2)
          var wins = data.stats.bedwars[player].wins
          var wins = wins.toFixed(0);
          const wins = Formatter(wins,2)
          this.send(`/gc Info for ${username} in mode ${player} - FKDR: ${data.stats.bedwars[player].finalKDRatio}, Winstreak: ${data.stats.bedwars[player].winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars[player].WLRatio}, BLR ${data.stats.bedwars[player].beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars[player].beds.broken} - ${makeid(10)}`)
        })
      }
      else if (player == 'overall') {
        HypAPI.getPlayer(username).then((data) => {
          var finals = data.stats.bedwars.finalKills
          var finals = finals.toFixed(0);
          const finals = Formatter(finals,2)
          var wins = data.stats.bedwars.wins
          var wins = wins.toFixed(0);
          const wins = Formatter(wins,2)
          this.send(`/gc Info for ${username} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
        })
      }
      else if (player == undefined) {
        HypAPI.getPlayer(username).then((data) => {
          var finals = data.stats.bedwars.finalKills
          var finals = finals.toFixed(0);
          const finals = Formatter(finals,2)
          var wins = data.stats.bedwars.wins
          var wins = wins.toFixed(0);
          const wins = Formatter(wins,2)
          this.send(`/gc Info for ${username} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
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
              if(mode == 'solo' ||
                mode == 'doubles' ||
                mode == 'threes' ||
                mode == 'fours' ||
                mode == '4v4' ||
                mode == 'castle') {
                  var finals = data.stats.bedwars[mode].finalKills
                  var finals = finals.toFixed(0);
                  const finals = Formatter(finals,2)
                  var wins = data.stats.bedwars[mode].wins
                  var wins = wins.toFixed(0);
                  const wins = Formatter(wins,2)
                  this.send(`/gc Info for ${player} in mode ${mode} - FKDR: ${data.stats.bedwars[mode].finalKDRatio}, Winstreak: ${data.stats.bedwars[mode].winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars[mode].WLRatio}, BLR ${data.stats.bedwars[mode].beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars[mode].beds.broken} - ${makeid(10)}`)
              }
              else if (mode == 'overall') {
                var finals = data.stats.bedwars.finalKills
                var finals = finals.toFixed(0);
                const finals = Formatter(finals,2)
                var wins = data.stats.bedwars.wins
                var wins = wins.toFixed(0);
                const wins = Formatter(wins,2)
              this.send(`/gc Info for ${player} - Star: ${data.stats.bedwars.level}, FKDR: ${data.stats.bedwars.finalKDRatio}, Winstreak: ${data.stats.bedwars.winstreak}, Wins: ${wins}, WLR ${data.stats.bedwars.WLRatio}, BLR ${data.stats.bedwars.beds.BLRatio}, Finals: ${finals}, Beds: ${data.stats.bedwars.beds.broken} - ${makeid(10)}`)
              }
              else if (mode == 'dream') {
                this.send(`/gc Invalid type! Valid Types: [voidless, lucky, armed, rush, ultimate] - ${makeid(10)}`)
              }
              else {
                this.send(`/gc Invalid mode! Valid Modes: [solo, double, threes, fours, 4v4, castle, overall, dream] - ${makeid(10)}`)
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


