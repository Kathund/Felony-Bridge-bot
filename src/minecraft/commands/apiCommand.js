const { addNotation, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
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
      const hypixelKey = await hypixel.getKeyInfo();
      const pixelicKey = await fetch(`${config.api.pixelicAPI}/key?key=${config.api.pixelicKey}`).then((res) => res.json());
      const pixelicApi = await fetch(`${config.api.pixelicAPI}/api?key=${config.api.pixelicKey}`).then((res) => res.json());
      const msg = this.getArgs(message);
      let hidden = false;
      if (msg[0] == "hidden") hidden = true;

      this.send(
        `${hidden ? "/oc" : "/gc"} Hypixel API - Key Owner: ${await getUsername(hypixelKey.owner)} Total Requests: ${addNotation(
          "oneLetters",
          hypixelKey.totalRequests
        )} | Pixel API - Total Requests: ${addNotation(
          "oneLetters",
          pixelicKey.totalRequests
        )} Players Tracked: ${addNotation("oneLetters", pixelicApi.playersTracked)}`
      );
    } catch (error) {
      console.log(error);
      await logError(error, username);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = APICommand;
