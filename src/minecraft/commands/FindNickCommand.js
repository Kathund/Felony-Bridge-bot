const { register, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class FindNickCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);
    this.name = "findnick";
    this.aliases = ["fnick"];
    this.description = "Finds a persons nick based on there ing.";
    this.options = ["ign"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const args = this.getArgs(message);
      if (args[0]) username = args[0];
      let hidden = false;
      if (args[1] == "hidden") hidden = true;
      const player = hypixel.getPlayer(username);
      fetch(
        `https://api.antisniper.net/findnick?key=${config.api.antiSniperKey}&name=${player}`
      ).then((res) => {
        res.json().then((data) => {
          this.send(
            `${hidden ? "/oc" : "/gc"} [${player.rank}] ${player.nickname}: Nicked - ${data.player.nick}`
          );
        });
      });
      await register(await getUUID(username), username)
    } catch (error) {
      await logError(username, error);
      console.log(error)
      this.send("/gc Something went wrong");
    }
  }
}

module.exports = FindNickCommand;
