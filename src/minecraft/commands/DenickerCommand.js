const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { register } = require("../../contracts/helperFunctions.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");
const config = require("../../../config.json");
const axios = require("axios");

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
      const args = this.getArgs(message)
      let hidden = false
      if (args[0]) username = args[0]
      if (args[1] == "hidden") hidden = true

      const response = (
        await axios.get(
          `${config.api.antiSniperAPI}/denick?key=${config.api.antiSniperKey}&nick=${username}`
        )
      ).data;

      if (!response.player?.ign) {
        return this.send(`${hidden ? "/oc" : "/gc"} Sorry, I wasn't able to denick this person`);
      }

      const player = await hypixel.getPlayer(response.player?.ign);
      this.send(
        `${hidden ? "/oc" : "/gc"} ${player.rank ? `[${player.rank}] ` : ``}${
          response.player?.ign
        } is nicked as ${response.player.queried_nick}`
      );
      await register(await getUUID(username), username)
    } catch (error) {
      this.send("/gc Sorry, I wasn't able to denick this person.");
    }
  }
}

module.exports = DenickerCommand;
