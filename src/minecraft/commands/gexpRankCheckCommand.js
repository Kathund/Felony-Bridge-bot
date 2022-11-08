const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class GEXPRankCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "grank";
    this.aliases = [];
    this.description = "j";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
        const arg = this.getArgs(message);
        if (arg[0]) username = arg[0];
        const player = await hypixel.getPlayer(username);
        const weekGEXP = player.guild.me.weeklyExperience
        console.log(weekGEXP)
        if (weekGEXP > config.guild.ranks.prisoners) {
            this.send(`/g setrank ${player.nickname} Prisoners`)
            await delay(500)
            this.send(`/gc ${player.nickname} is now a Prisoners!`)
            if (weekGEXP > config.guild.ranks.thieves) {
                this.send(`/g setrank ${player.nickname} Thieves`)
                await delay(500)
                this.send(`/gc ${player.nickname} is now a Thieves!`)
                if (weekGEXP > config.guild.ranks.guards) {
                    this.send(`/g setrank ${player.nickname} Guards`)
                    await delay(500)
                    this.send(`/gc ${player.nickname} is now a Guard!`)
                }
            }
        } else {
            this.send(`/g kick ${player.nickname} Inactive If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
            await delay(500)
            this.send(`/gc ${player.nickname} didn't get the 50k gexp a week`)
        }

    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GEXPRankCommand;
