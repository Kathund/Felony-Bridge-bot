const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class UHCStatsCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "UHC";
        this.aliases = ["uhc"];
        this.description = "UHC Stats of specified user.";
        this.options = ["name"];
        this.optionsDescription = ["Minecraft Username"];
    }

    async onCommand(username, message) {
        try {
            const msg = this.getArgs(message);
            if (msg[0]) username = msg[0];
            const player = await hypixel.getPlayer(username);
            var stats = player.stats.arcade.zombies
            this.send(`/gc [${player.rank} ${player.nickname}]: Wins: ${stats.overall.wins} | Kills: ${stats.overall.zombieKills} | Deaths: ${stats.overall.deaths} | Shots: ${stats.bulletsShot} Hits: ${stats.bulletsHit} Accuracy: ${stats.gunAccuracy} Headshot Accuracy ${stats.headshotAccuracy}`);
        } catch (error) {
            this.send(
                "There is no player with the given UUID or name or player has never joined Hypixel."
            );
        }
    }
}

module.exports = UHCStatsCommand;
