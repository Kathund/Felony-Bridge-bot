const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const { register } = require("../../contracts/helperFunctions.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");
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
      let hidden = false;
      if (args[1] == ["hidden", "hide", "h"]) hidden = true;
      username = this.getArgs(message)[0];
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
      console.log(register(username, await getUUID(username)))
    } catch (error) {
      this.send("/gc Something went wrong");
    }
  }
}

module.exports = FindNickCommand;
