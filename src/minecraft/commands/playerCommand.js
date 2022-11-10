const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addNotation } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class PlayerCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "player";
        this.aliases = [];
        this.description = "PLayer info of specified user.";
        this.options = ["name"];
        this.optionsDescription = ["Minecraft Username"];
    }

    async onCommand(username, message) {
        try {
            const msg = this.getArgs(message);
            if (msg[0]) username = msg[0];
            const player = await hypixel.getPlayer(username);
            const guild = await hypixel.getGuild('player', username)
            this.send(`/gc [${player.rank}] ${player.nickname}: Level: ${player.level} | Karma ${addNotation("oneLetters", player.karma)} | Achievement Points ${addNotation("oneLetters", player.achievementPoints)} | Guild: ${guild.name}`);
        } catch (error) {
            this.send(
                "There is no player with the given UUID or name or player has never joined Hypixel."
            );
        }
    }
}

module.exports = PlayerCommand;
