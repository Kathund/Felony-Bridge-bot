const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class CalculateBedwarsCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "calcbw";
        this.aliases = [];
        this.description = "Alows you to calc how close you are to the next fkdr/wlr/blr";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            // could be cleaner but it works
            const args = this.getArgs(message);
            let type = null;
            let target = null;
            let hidden = false;

            if (!['fkdr', 'wlr', 'blr', 'bblr'].includes(args[0])) {
                username = args[0];
                if (["fkdr", "wlr", "blr", "bblr"].includes(args[1])) type = args[1];
                if (args[2]) target = args[2];
                if (args[3] == 'hidden') hidden = true;
            } else {
                type = args[0];
                if (args[1]) target = args[1];
                if (args[2] == 'hidden') hidden = true;
            }

            var player = await hypixel.getPlayer(username);

            if (type == 'fkdr') {
                if (target < player.stats.bedwars.finalKDRatio) { this.send(`${hidden ? "/oc" : "/gc"} You already have a higher fkdr than ${target}`) }
                else {
                    var finalKills = player.stats.bedwars.finalKills;
                    var finalDeaths = player.stats.bedwars.finalDeaths;
                    var neededFinalKills = (target * finalDeaths) - finalKills;
                    this.send(`${hidden ? "/oc" : "/gc"} You need ${neededFinalKills.toFixed(2)} final kills with 0 final deaths to reach ${target} fkdr`);
                }
            } else if (type == 'wlr') {
                if (target < player.stats.bedwars.WLRatio) { this.send(`${hidden ? "/oc" : "/gc"} You already have a higher wlr than ${target}`) }
                else {
                    var wins = player.stats.bedwars.wins;
                    var losses = player.stats.bedwars.losses;
                    var neededWins = (target * losses) - wins;
                    this.send(`${hidden ? "/oc" : "/gc"} You need ${neededWins.toFixed(2)} wins with 0 losses to reach ${target} wlr`);
                }
            } else if (type == 'blr' || type == "bblr") {
                if (target < player.stats.bedwars.beds.BLRatio) { this.send(`${hidden ? "/oc" : "/gc"} You already have a higher blr than ${target}`) }
                else {
                    var brokenBeds = player.stats.bedwars.beds.broken;
                    var lostBeds = player.stats.bedwars.beds.lost;
                    var neededBrokenBeds = (target * lostBeds) - brokenBeds;
                    this.send(`${hidden ? "/oc" : "/gc"} You need ${neededBrokenBeds.toFixed(2)} broken beds with 0 lost beds to reach ${target} blr`);
                }
            }
        } catch (error) {
            await logError(error, username);
            console.log(error);
            this.send(`/gc Something went wrong..`);
        }
    }
}

module.exports = CalculateBedwarsCommand;
