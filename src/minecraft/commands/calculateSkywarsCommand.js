const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class CalculatSkywarsCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "calcskywars";
        this.aliases = ["calcsw"];
        this.description = "Alows you to calc how close you are to the next wlr/kd";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            // could be cleaner but it works
            const args = this.getArgs(message);
            let type = null;
            let target = null;
            let hidden = false;

            if (!['kd', 'wlr'].includes(args[0])) {
                username = args[0];
                if (["kd", "wlr"].includes(args[1])) type = args[1];
                if (args[2]) target = args[2];
                if (args[3] == 'hidden') hidden = true;
            } else {
                if (['kd', 'wlr'].includes(args[0])) type = args[0];
                if (args[1]) target = args[1];
                if (args[2] == 'hidden') hidden = true;
            }

            var player = await hypixel.getPlayer(username);

            if (type == 'kd') {
                if (target < player.stats.skywars.KDRatio) { this.send(`${hidden ? "/oc" : "/gc"} You already have a higher kd than ${target}`) }
                else {
                    var kills = player.stats.skywars.kills
                    var deaths = player.stats.skywars.deaths
                    var neededKills = (target * deaths) - kills;
                    this.send(`${hidden ? "/oc" : "/gc"} You need ${neededKills.toFixed(2)} kills with 0  deaths to reach ${target} kd`);
                }
            } else if (type == 'wlr') {
                if (target < player.stats.skywars.WLRatio) { this.send(`${hidden ? "/oc" : "/gc"} You already have a higher wlr than ${target}`) }
                else {
                    var wins = player.stats.skywars.wins;
                    var losses = player.stats.skywars.losses;
                    var neededWins = (target * losses) - wins;
                    this.send(`${hidden ? "/oc" : "/gc"} You need ${neededWins.toFixed(2)} wins with 0 losses to reach ${target} wlr`);
                }
            }
        } catch (error) {
            await logError(error, username);
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = CalculatSkywarsCommand;
