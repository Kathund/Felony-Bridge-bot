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
            if (username == 'SpookyBurger' || username == 'SpookyTryin' || username == 'SpookyKath' || username == 'Aqua015' || username == 'SpookyZom' || username == 'SpookyMosu' || username == 'SpookyCGTV') {
                this.send(`/gc The furrys are SpookyTryin SpookyBurger Aqua015 SpookyZom SpookyMosu SpookyCGTV `);
            }
            else {
                this.send(`/gc The furrys are SpookyTryin SpookyBurger Aqua015 SpookyZom SpookyMosu SpookyCGTV and finally ${username}`);
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