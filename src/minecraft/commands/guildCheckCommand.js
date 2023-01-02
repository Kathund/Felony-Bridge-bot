const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")

class GEXPRankCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "guildcheck";
        this.aliases = ["gcheck"];
        this.description = "j";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            const check = await hypixel.getGuild(`player`, username)
            const arg = this.getArgs(message);
            if (check.me.rank == "Police" || check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
                if (arg[0]) {
                    const ign = arg[0];
                    const guild = await hypixel.getGuild('player', ign);
                    if (guild.me.rank == "Police" || guild.me.rank == "Wardens" || guild.me.rank == "Guild Master") {
                        this.send(`/gc ${ign} is a staff member`)
                    } else {
                        const weekGEXP = guild.me.weeklyExperience
                        if (weekGEXP > config.minecraft.guild.ranks.guards) {
                            this.send(`/gc ${ign} is now Guards`)
                            await delay(1000)
                            this.minecraft.bot.chat(`/g setrank ${ign} Guards`)
                        } else if (weekGEXP > config.minecraft.guild.ranks.thieves) {
                            this.send(`/gc ${ign} is now Thieves`)
                            await delay(1000)
                            this.minecraft.bot.chat(`/g setrank ${ign} Thieves`)
                        } else if (weekGEXP > config.minecraft.guild.ranks.prisoners) {
                            this.send(`/gc ${ign} is now Prisoners`)
                            await delay(1000)
                            this.minecraft.bot.chat(`/g setrank ${ign} Prisoners`)
                        } else {
                            this.send(`/go ${ign} dose not have the 50k gxp`)
                            await delay(1000)
                            if (config.minecraft.guild.kicking == false) {
                                this.send(`/oc Kicking is disabled`)
                                await delay(1000)
                                this.minecraft.bot.chat(`/g setrank ${ign} Prisoners`)
                            } else {
                                this.send(`/g kick ${ign} Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
                            }
                        }
                    }
                } else {
                    this.send(`/gc You need to specify a player`)
                }
            } else {
                this.send(`/gc This is a staff only command`)
            }
        } catch (error) {
            await logError(username, error);
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = GEXPRankCommand;
