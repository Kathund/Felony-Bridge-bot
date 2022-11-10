const minecraftCommand = require("../../contracts/MinecraftCommand.js");
const { addNotation, capitalize } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUsername } = require("../../contracts/API/PlayerDBAPI.js");

class GuildInformationCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "guild";
    this.aliases = ["g"];
    this.description = "View information of a guild";
  }

  async onCommand(username, message) {
    try {
      const args = this.getArgs(message);
      const guildName = args.map((arg) => capitalize(arg)).join(" ");
      const guild = await hypixel.getGuild("name", guildName).catch((err) => {
        return this.send("/gc This guild does not exist.");
      });

      const owner = await getUsername(guild.guildMaster.uuid);

      this.send(`/gc Guild ${guildName} | Tag: ${guild.tag} | Members: ${guild.members.length} | Level: ${guild.level} | Weekly GEXP: ${addNotation("oneLetters", guild.totalWeeklyGexp)} | Owner: ${owner}`);
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GuildInformationCommand;