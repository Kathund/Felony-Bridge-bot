const { addCommas, register, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

class GuildEXPCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "guildexp";
    this.aliases = ["gexp", "gxp"];
    this.description = "Check a players guild experience";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const arg = this.getArgs(message);
      if (arg[0]) username = arg[0];
      let hidden = false;
      if (arg[1] == "hidden") hidden = true;
      var guild = await hypixel.getGuild("player", username);
      var rawGexp = guild.me.weeklyExperience;
      var gexp = addCommas(rawGexp);
      this.send(`${hidden ? "/oc" : "/gc"} ${username}'s GEXP is ${gexp}`);
      await register(await getUUID(username), username)
    } catch (error) {
      await logError(error, username);
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GuildEXPCommand;
