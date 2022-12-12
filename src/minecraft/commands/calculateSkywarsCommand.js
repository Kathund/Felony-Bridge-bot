const minecraftCommand = require("../../contracts/minecraftCommand.js");
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
            const msg = this.getArgs(message);
            let type = null;
            let target = null;

            // Todo add support for someones username and a gamemode 
            if (['kd', 'wlr'].includes(msg[0])) type = msg[0];
            if (msg[1]) target = msg[1];

            var player = await hypixel.getPlayer(username);

            if (type == 'kd') {
                if (target < player.stats.skywars.KDRatio) { this.send(`/gc You already have a higher kd than ${target}`) }
                else {
                    var kills = player.stats.skywars.kills
                    var deaths = player.stats.skywars.deaths
                    var neededKills = (target * deaths) - kills;
                    this.send(`/gc You need ${neededKills.toFixed(2)} kills with 0  deaths to reach ${target} kd`);
                }
            } else if (type == 'wlr') {
                if (target < player.stats.skywars.WLRatio) { this.send(`/gc You already have a higher wlr than ${target}`) }
                else {
                    var wins = player.stats.skywars.wins;
                    var losses = player.stats.skywars.losses;
                    var neededWins = (target * losses) - wins;
                    this.send(`/gc You need ${neededWins.toFixed(2)} wins with 0 losses to reach ${target} wlr`);
                }
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = CalculatSkywarsCommand;
