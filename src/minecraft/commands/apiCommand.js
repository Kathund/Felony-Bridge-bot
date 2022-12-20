const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addNotation } = require("../../contracts/helperFunctions.js");
const { getUsername } = require("../../contracts/API/MojangAPI.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class APICommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "api";
    this.aliases = [];
    this.description = "api command go brrr";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      var key = await hypixel.getKeyInfo()
      fetch(`${config.api.pixelicAPI}/key?key=${config.api.pixelicKey}`).then(res => res.json()).then(async (keyData) => {
        fetch(`${config.api.pixelicAPI}/api?key=${config.api.pixelicKey}`).then(res => res.json()).then(async (apiData) => {
          this.send(`/gc Hypixel API - Key Owner: ${await getUsername(key.owner)} Total Requests: ${addNotation('oneLetters', key.totalRequests)} | Pixel API - Total Requests: ${addNotation('oneLetters', keyData.totalRequests)} Players Tracked: ${addNotation('oneLetters', apiData.playersTracked)}`)
        })
      })
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = APICommand;
