const minecraftCommand = require("../../contracts/minecraftCommand.js");

class FurryCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "furry";
        this.aliases = ["furrys"];
        this.description = "Fairy Souls of specified user.";
        this.options = ["name"];
        this.optionsDescription = ["Minecraft Username"];
    }

    async onCommand(username, message) {
        try {
            this.send(`/gc The furrys are TryinHard SpookyBurger VQUV I1lI Mosu Yunoh_ oBigTiger 1vz_ SpookyCGTV and finally ${username}`);
        } catch (error) {
            console.log(error);
            this.send(
                "/gc There is no player with the given"
            );
        }
    }
}

module.exports = FurryCommand;