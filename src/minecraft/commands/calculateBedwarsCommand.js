const minecraftCommand = require("../../contracts/minecraftCommand.js");
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
            if (username == 'SnowyHitlast') {
                // could be cleaner but it works
                const msg = this.getArgs(message);
                let type = null;
                let target = null;

                if (msg[0] && !msg[0].includes("/")) {
                    username = msg[0];
                    if (['fkdr', 'wlr', 'blr'].includes(msg[1])) type = msg[1];
                    if (msg[2]) target = msg[2];
                } else if (msg[1] && !msg[1].includes("/")) {
                    username = msg[1];
                    if (['fkdr', 'wlr', 'blr'].includes(msg[0])) type = msg[0];
                    if (msg[2]) target = msg[2];
                } else if (msg[2] && !msg[2].includes("/")) {
                    username = msg[2];
                    if (['fkdr', 'wlr', 'blr'].includes(msg[0])) type = msg[0];
                    if (msg[1]) target = msg[1];
                }

                var player = await hypixel.getPlayer(username);

                if (type == 'fkdr') {
                    if (target > player.stats.bedwars.finalKDRatio) { this.send(`/gc You already have a higher fkdr than ${target}`) }
                    else {
                        var finalKills = player.stats.bedwars.finalKills;
                        var finalDeaths = player.stats.bedwars.finalDeaths;
                        var neededFinalKills = (target * finalDeaths) - finalKills;
                        this.send(`/gc You need ${neededFinalKills} final kills with 0 final deaths to reach ${target} fkdr`);
                    }
                } else if (type == 'wlr') {
                    var wins = player.stats.bedwars.wins;
                    var losses = player.stats.bedwars.losses;
                    var neededWins = (target * losses) - wins;
                    this.send(`/gc You need ${neededWins} wins with 0 losses to reach ${target} wlr`);
                } else if (type == 'blr') {
                    var brokenBeds = player.stats.bedwars.beds.broken;
                    var lostBeds = player.stats.bedwars.beds.lost;
                    var neededBrokenBeds = (target * lostBeds) - brokenBeds;
                    this.send(`/gc You need ${neededBrokenBeds} broken beds with 0 lost beds to reach ${target} blr`);
                }
            }

        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = CalculateBedwarsCommand;
