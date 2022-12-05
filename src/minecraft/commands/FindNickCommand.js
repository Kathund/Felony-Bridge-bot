const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
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
      fetch(
        `${config.api.pixelicAPI}/player/register?key=${config.api.pixelicKey}&uuid=${player.uuid}`,
        {
          method: "POST",
        }
      ).then((res) => {
        if (res.status == 201) {
          console.log(
            `Successfully registered ${player.nickname} in the database!`
          );
        } else if (res.status == 400) {
          console.log(
            `${player.nickname} is already registered in the database!`
          );
        } else {
          console.log(
            `An error occured while registering ${player.nickanem} in the database! Please try again in few seconds.`
          );
        }
      });
    } catch (error) {
      this.send("/gc Something went wrong");
    }
  }
}

module.exports = FindNickCommand;
