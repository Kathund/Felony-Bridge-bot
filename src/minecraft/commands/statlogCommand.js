const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class FurryCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "log";
        this.aliases = [];
        this.description = "a";
        this.options = [];
        this.optionsDescription = [];
    }

    async onCommand(username, message) {
        try {
            if (username != 'Udderly_cool') {
                this.send(`/gc fuck off my test command`)
            }
            else {
                const msg = this.getArgs(message);
                var mode = msg[1];
                const player = await hypixel.getPlayer(username);
                console.log(player.stats[mode])
            }
        } catch (error) {
            console.log(error);
            this.send(
                "/gc There is no player with the given UUID or name or the player has no Skyblock profiles"
            );
        }
    }
}

module.exports = FurryCommand;