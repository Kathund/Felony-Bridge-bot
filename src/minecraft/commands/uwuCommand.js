const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class UwuCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "uwu";
        this.aliases = ["owo", "meow", "bark"];
        this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            this.send(`/gc uwu!`)
            await delay(300)
            this.minecraft.bot.chat(`/g kick 1vz_ uwu men go in my ass uwu uwu`)
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = UwuCommand;
