const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class MurderMysteryCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "MurderMystery";
        this.aliases = ["mm"];
        this.description = "Murder Mystery Stats of specified user.";
        this.options = ["name"];
        this.optionsDescription = ["Minecraft Username"];
    }

    async onCommand(username, message) {
        try {
            const msg = this.getArgs(message);
            if (msg[0]) username = msg[0];
            const player = await hypixel.getPlayer(username);
            var stats = player.stats.murdermystery
            var losses = stats.playedGames - stats.wins
            var WLR = stats.wins / losses
            this.send(`/gc [${player.rank} ${player.nickname}]: Wins: ${stats.wins} Losses: ${losses} WLR ${WLR} Played Games: ${stats.playedGames} | Kills: ${stats.zombieKills} Deaths: ${stats.deaths} KD ${stats.KDRatio}`);
        } catch (error) {
            this.send(
                "There is no player with the given UUID or name or player has never joined Hypixel."
            );
        }
    }
}

module.exports = MurderMysteryCommand;
