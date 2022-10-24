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

class PlayerCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'player'
    this.aliases = ['']
    this.description = 'Look up a player'
  }

 
onCommand(username, message) {
  if (check != 'disabled') {
    // get the player name in the second word of the message
    const player = message.split(' ')[1]
    if (player == 'help') {
      this.send(`/gc Usage: - !player <player> - look up a player - ${makeid(10)}`)
    }
    // get the player's stats
    else {
      HypAPI.getPlayer(player).then((data) => {
          // console log the data
          console.log(data)
          var karma = data.karma
          var ap = data.achievementPoints
          var karma = karma.toFixed(0);
          var ap = ap.toFixed(0);
          const karma = Formatter(karma,2)
          const ap = Formatter(ap,2)
          this.send(`/gc Info for ${player} - Rank: ${data.rank} Karma: ${karma} Network Level: ${data.level} Achievement Points: ${ap} - ${makeid(10)}`)
      }).catch((error) => {
        this.send(`/gc ${player} is not a valid player!`)
        console.log(error)
      })
    }
  }
  else {
    this.send(`/gc This command is disabled! - ${makeid(10)}`)
  }
}}

module.exports = PlayerCommand


