const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
    import("node-fetch")
        .then(({ default: fetch }) => fetch(...args))
        .catch((err) => console.log(err));

class PitCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "pit";
        this.aliases = [];
        this.description = "pit stats";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            const msg = this.getArgs(message);
            if (msg[0]) username = msg[0]
            const player = await hypixel.getPlayer(username);
            this.send(`/gc [${player.rank}] ${player.nickname}: Kills: ${player.stats.pit.kills} | I know this is nothing but this is the only thing in the api lmao`)
            fetch(`https://api.pixelic.de/v1/player/register?key=${config.api.pixelKey}&uuid=${player.uuid}`, {
                method: "POST",
            }).then((res) => {
                if (res.status == 201) {
                    console.log(`/gc Successfully registered ${player.nickname} in the database!`);
                } else if (res.status == 400) {
                    console.log(`/gc ${player.nickname} is already registered in the database!`);
                } else {
                    console.log(`/gc An error occured while registering ${player.nickname} in the database! Please try again in few seconds.`);
                }
            });
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = PitCommand;
