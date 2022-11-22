const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const fetch = (...args) =>
    import("node-fetch")
        .then(({ default: fetch }) => fetch(...args))
        .catch((err) => console.log(err));


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
            const friends = friend.length + 1
            this.send(`/gc [${player.rank}] ${player.nickname} has ${friends} friends`);
            fetch(`https://api.pixelic.de/v1/player/register?key=${config.api.pixelKey}&uuid=${player.uuid}`, {
                method: "POST",
            }).then((res) => {
                if (res.status == 201) {
                    console.log(`Successfully registered ${player.nickname} in the database!`);
                } else if (res.status == 400) {
                    console.log(`${player.nickname} is already registered in the database!`);
                } else {
                    console.log(`An error occured while registering ${player.nickanem} in the database! Please try again in few seconds.`);
                }
            });
        } catch (error) {
            console.log(error)
            this.send(`/gc Something went wrong`);
        }
    }
}

module.exports = FriendsCommand;
