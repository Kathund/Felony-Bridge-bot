const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { register } = require("../../contracts/helperFunctions.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");
const config = require("../../../config.json");

class RequirementsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "requirements";
    this.aliases = ["reqs"];
    this.description = "Alows you to check if they have the requirements to join the guild";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const args = this.getArgs(message)
      if (args[0]) username = args[0]
      let hidden = false
      if (args[1] == "hidden") hidden = true
      const player = await hypixel.getPlayer(username)
      let meetRequirements = false;

      let hasBwRequirements = false;
      let hasSwRequirements = false;
      let hasDuelsRequirements = false;

      const bwWins = player.stats.bedwars.wins;
      const swWins = player.stats.skywars.wins;
      const duelsWins = player.stats.duels.wins;

      if (
        bwWins >= config.minecraft.guild.requirements.bedwarsWins
      ) {
        (hasBwRequirements = true), (meetRequirements = true)
      }
      if (
        swWins >= config.minecraft.guild.requirements.skywarsWins
      ) {
        (hasSwRequirements = true), (meetRequirements = true)
      }
      if (
        duelsWins >= config.minecraft.guild.requirements.duelsWins
      ) {
        (hasDuelsRequirements = true), (meetRequirements = true)
      }

      this.send(`${hidden ? "/oc" : "/gc"} [${player.rank}] ${player.nickname} ${meetRequirements ? "has" : "does not have"} the requirements to join ${config.minecraft.guild.name} - Bedwars: ${hasBwRequirements ? "✔" : "✘"} - Skywars: ${hasSwRequirements ? "✔" : "✘"} - Duels: ${hasDuelsRequirements ? "✔" : "✘"}`)
      await register(getUUID(username), username)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = RequirementsCommand;
