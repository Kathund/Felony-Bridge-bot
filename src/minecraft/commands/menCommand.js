const MinecraftCommand = require('../../contracts/MinecraftCommand')
const HypixelAPIReborn = require('hypixel-api-reborn')
const HypAPI = require('../../Hypixel.js')
const KEY = '52fda931-396a-407a-bcb8-958f93e8449a'
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
      { value: 1e12, symbol: "t" },
      { value: 1e15, symbol: "q" },
      { value: 1e18, symbol: "qi" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
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
    
  }
  else {
      this.send(`/gc This command is disabled! - ${makeid(10)}`)
    }
  }
}

module.exports = men


