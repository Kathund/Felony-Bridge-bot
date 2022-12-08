const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class SocialMediaCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "socialmedia";
        this.aliases = ['sm'];
        this.description = "Shows the linked Social Media of a player";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            const msg = this.getArgs(message);
            if (msg[0]) username = msg[0]
            var player = await hypixel.getPlayer(username)
            this.send(`no`)
            var socialMedia = [];
            for (const member in player.socialMedia) {
                socialMedia.push(player.socialMedia[member])
            }
            console.log(socialMedia)
            var num = socialMedia.length
            console.log(num)
            console.log(socialMedia[num])
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = SocialMediaCommand;
