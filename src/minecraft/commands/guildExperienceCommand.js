const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addCommas } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

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
      if (arg[0]) username = arg[0]
      var guild = await hypixel.getGuild('player', username)
      var rawGexp = guild.me.weeklyExperience
      var gexp = addCommas(rawGexp)
      this.send(`/gc ${username}'s GEXP is ${gexp}`)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GuildEXPCommand;
