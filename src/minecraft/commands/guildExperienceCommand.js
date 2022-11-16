const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { addCommas } = require("../../contracts/helperFunctions.js");
const config = require("../../../config.json")

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
      if (arg[0]) {
        username = arg[0]
        let guild = await hypixel.getGuild('player', username)
        let rawGexp = guild.me.weeklyExperience
        let gexp = addCommas(rawGexp)
        let rank = 'a'
        if (rawGexp >= config.minecraft.guild.ranks.guards) rank = 'guards'
        if (rawGexp >= config.minecraft.guild.ranks.thieves) rank = 'thieves'
        if (rawGexp >= config.minecraft.guild.ranks.prisoners) rank = 'prisoners'
        if (rank == 'a') {
          this.send(`/gc ${username}'s GEXP is ${gexp} - They don't have the requirements to stay in ${config.minecraft.guild.name}`)
        } else {
          this.send(`/gc ${username}'s GEXP is ${gexp} - They have the requirements for ${rank}`)
        }
      } else {
        let guild = await hypixel.getGuil('player', username)
        let rawGexp = guild.me.weeklyExperience
        let gexp = addCommas(rawGexp)
        let rank = 'a'
        if (rawGexp >= config.minecraft.guild.ranks.guards) rank = 'guards'
        if (rawGexp >= config.minecraft.guild.ranks.thieves) rank = 'thieves'
        if (rawGexp >= config.minecraft.guild.ranks.prisoners) rank = 'prisoners'
        if (rank == 'a') {
          this.send(`/gc ${username}'s GEXP is ${gexp} - They don't have the requirements to stay in ${config.minecraft.guild.name}`)
        } else {
          this.send(`/gc ${username}'s GEXP is ${gexp} - They have the requirements for ${rank}`)
        }
      }
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GuildEXPCommand;
