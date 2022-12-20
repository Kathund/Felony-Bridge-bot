const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { register } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

class CSGOCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "csgo";
    this.aliases = ["copsandcrims", "cac"];
    this.description = "Cops And Crims info of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const args = this.getArgs(message);
      let hidden = false
      if (args[0]) username = args[0];
      if (args[1] == ["hidden", "hide", "h"]) hidden = true
      const player = hypixel.getPlayer(username);
      this.send(
        `${hidden ? '/oc' : '/gc'} [ ${player.rank} ] ${player.nickanme}: Cops And Crims Stats | Kills: ${player.stats.copsandcrims.kills} Deaths: ${player.stats.copsandcrims.deaths} KD: ${player.stats.copsandcrims.KDRatio} | Wins ${player.stats.copsandcrims.wins}`
      );


      console.log(register(await getUUID(username)), username)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = CSGOCommand;
