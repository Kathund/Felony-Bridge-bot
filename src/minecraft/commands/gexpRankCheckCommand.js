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
            const player = await hypixel.getPlayer(username)
            if (player.guild.me.rank == "Police" || player.guild.me.rank == "Wardens" || player.guild.me.rank == "Guild Master") {
                const arg = this.getArgs(message);
                var ign = null
                if (arg[0]) ign = arg[0];
                const ignRank = await hypixel.getPlayer(ign);
                const weekGEXP = ignRank.guild.me.weeklyExperience
                console.log(weekGEXP)
                if (weekGEXP > config.guild.ranks.prisoners) {
                    this.send(`/g setrank ${ignRank.nickname} Prisoners`)
                    await delay(500)
                    if (weekGEXP > config.guild.ranks.thieves) {
                        this.send(`/g setrank ${ignRank.nickname} Thieves`)
                        if (weekGEXP > config.guild.ranks.guards) {
                            this.send(`/g setrank ${ignRank.nickname} Guards`)
                            await delay(500)
                            this.send(`/gc ${ignRank.nickname} is now a Guard!`)
                        } else {
                            await delay(500)
                            this.send(`/gc ${ignRank.nickname} is now a Thieves!`)
                        }
                    }
                } else {
                    this.send(`/g kick ${ignRank.nickname} Inactive If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
                    await delay(500)
                    this.send(`/gc ${ignRank.nickname} didn't get the 50k gexp a week`)
                }
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = GEXPRankCommand;
