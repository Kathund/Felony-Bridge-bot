const minecraftCommand = require("../../contracts/minecraftCommand.js");

class ExampleCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.aliases = [];
        this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            if (username == "hitlast") {
                this.send(`/gc ${username} is a gay`)
                process.exit(0);
            }
            this.send(`/go i like men`)
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = ExampleCommand;
