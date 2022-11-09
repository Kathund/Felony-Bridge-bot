const minecraftCommand = require("../../contracts/minecraftCommand.js");
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
            console.log(weekGEXP)
            if (player.guild.me.rank == "Police" || player.guild.me.rank == "Wardens" || player.guild.me.rank == "Guild Master") {
                if (arg[0]) ign = arg[0];
                const ignRank = await hypixel.getPlayer(ign);
                const weekGEXP = ignRank.guild.me.weeklyExperience
                if (weekGEXP > config.minecraft.ranks.guards) {
                    this.send(`/g setrank ${ign} Guards`)
                } else if (weekGEXP > config.minecraft.ranks.thieves) {
                    this.send(`/g setrank ${ign} Thieves`)
                } else if (weekGEXP > config.minecraft.ranks.prisoners) {
                    this.send(`/g setrank ${ing} Prisoners`)
                } else {
                    this.send(`/g`)
                }
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = GEXPRankCommand;
