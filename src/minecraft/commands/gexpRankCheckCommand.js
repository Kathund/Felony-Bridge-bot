const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.example.json")

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
            const arg = this.getArgs(message);
            if (player.guild.me.rank == "Police" || player.guild.me.rank == "Wardens" || player.guild.me.rank == "Guild Master") {
                if (arg[0]) {
                    const ign = arg[0];
                    const ignRank = await hypixel.getPlayer(ign);
                    const weekGEXP = ignRank.guild.me.weeklyExperience
                    console.log(weekGEXP)
                    if (weekGEXP > config.minecraft.ranks.guards) {
                        this.send(`/gc ${ign} is now Guards`)
                        await delay(1000)
                        this.send(`/g setrank ${ign} Guards`)
                    } else if (weekGEXP > config.minecraft.ranks.thieves) {
                        this.send(`/gc ${ign} is now Thieves`)
                        await delay(1000)
                        this.send(`/g setrank ${ign} Thieves`)
                    } else if (weekGEXP > config.minecraft.ranks.prisoners) {
                        this.send(`/gc ${ign} is now Prisoners`)
                        await delay(1000)
                        this.send(`/g setrank ${ign} Prisoners`)
                    } else {
                        this.send(`/go ${ign} dose not have the 50k gxp`)
                        await delay(1000)
                        this.send(`/g kick ${ign} Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
                    }
                } else {
                    this.send(`/gc You need to specify a player`)
                }
            } else {
                this.send(`/gc This is a staff only command`)
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = GEXPRankCommand;
