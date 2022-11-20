const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class FriendsCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "friends";
        this.aliases = [];
        this.description = "friends info of specified user.";
        this.options = ["name"];
        this.optionsDescription = ["Minecraft Username"];
    }

    async onCommand(username, message) {
        try {
            const msg = this.getArgs(message);
            if (msg[0]) username = msg[0];
            const player = await hypixel.getPlayer(username);
            const friend = await hypixel.getFriends(username)
            this.send(`/gc [${player.rank}] ${player.nickname}: its not ready`);
            if (username == 'hitlast') {
                console.log(friend)
            }
        } catch (error) {
            this.send("There is no player with the given UUID or name or player has never joined Hypixel.");
        }
    }
}

module.exports = FriendsCommand;
