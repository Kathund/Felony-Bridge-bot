const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class BlacklistCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "blacklist";
        this.aliases = [];
        this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            const check = await hypixel.getGuild(`player`, username)
            const arg = this.getArgs(message);
            if (check.me.rank == "Police" || check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
                if (arg[0]) {
                    if (arg[1]) {
                        var toggle = arg[0];
                        var ign = arg[1];
                        if (toggle == "add") {
                            this.minecraft.bot.chat(`/ignore add ${ign}`)
                            await delay(1000)
                            this.send(`/oc ${ign} has been blacklisted`)
                        }
                        if (toggle == "remove") {
                            this.minecraft.bot.chat(`/ignore remove ${ign}`)
                            await delay(1000)
                            this.send(`/oc ${ign} has been removed from the blacklist`)
                        } else {
                            this.send(`/gc Invalid type - add or remove`)
                        }
                    } else {
                        this.send(`/gc You need to specify a player`)
                    }
                } else {
                    this.send(`/gc You need to specify a type`)
                }
            } else {
                this.send(`/gc This is a staff only command`)
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = BlacklistCommand;
