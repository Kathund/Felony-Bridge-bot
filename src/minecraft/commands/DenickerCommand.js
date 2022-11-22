const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const axios = require("axios");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class DenickerCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "denick";
    this.aliases = [];
    this.description = "Denick username of specified user.";
    this.options = ["nick"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      username = this.getArgs(message)[0];
      const response = (
        await axios.get(
          `${config.api.antiSniperAPI}/denick?key=${config.api.antiSniperKey}&nick=${username}`
        )
      ).data;

      if (!response.player?.ign) {
        return this.send("/gc Sorry, I wasn't able to denick this person.");
      }

      const player = await hypixel.getPlayer(response.player?.ign);
      this.send(
        `/gc ${player.rank ? `[${player.rank}] ` : ``}${response.player?.ign
        } is nicked as ${response.player.queried_nick}`
      );
      fetch(`https://api.pixelic.de/v1/player/register?key=${config.api.pixelKey}&uuid=${player.uuid}`, {
        method: "POST",
      }).then((res) => {
        if (res.status == 201) {
          console.log(`Successfully registered ${player.nickname} in the database!`);
        } else if (res.status == 400) {
          console.log(`${player.nickname} is already registered in the database!`);
        } else {
          console.log(`An error occured while registering ${player.nickanem} in the database! Please try again in few seconds.`);
        }
      });      
    } catch (error) {
      this.send("/gc Sorry, I wasn't able to denick this person.");
    }
  }
}

module.exports = DenickerCommand;
