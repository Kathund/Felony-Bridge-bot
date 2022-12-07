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
            if (username == "SnowyHitlast") {
                const msg = this.getArgs(message);
                let type = null;
                let target = null;

                if (['fkdr', 'wlr', 'blr'].includes(msg[0])) type = msg[0];
                console.log(type)
                if (msg[1]) target = msg[1];

                var player = await hypixel.getPlayer(username);

                if (type == 'fkdr') {
                    console.log(`fkdr running`)
                    var finalKills = player.stats.bedwars.finalKills;
                    var finalDeaths = player.stats.bedwars.finalDeaths;
                    var neededFinalKills = (target * finalDeaths) - finalKills;
                    this.send(`/gc You need ${neededFinalKills} final kills with 0 final deaths to reach ${target} fkdr`);
                } else if (type == 'wlr') {
                    console.log(`wlr running`)
                    var wins = player.stats.bedwars.wins;
                    var losses = player.stats.bedwars.losses;
                    var neededWins = (target * losses) - wins;
                    this.send(`/gc You need ${neededWins} wins with 0 losses to reach ${target} wlr`);
                } else if (type == 'blr') {
                    console.log(`blr running`)
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
