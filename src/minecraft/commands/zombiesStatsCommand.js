const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const fetch = (...args) =>
    import("node-fetch")
        .then(({ default: fetch }) => fetch(...args))
        .catch((err) => console.log(err));


class ZombiesCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "zombies";
        this.aliases = [];
        this.description = "Zombies Stats of specified user.";
        this.options = ["name"];
        this.optionsDescription = ["Minecraft Username"];
    }

    async onCommand(username, message) {
        try {
            const msg = this.getArgs(message);
            if (msg[0]) username = msg[0];
            const player = await hypixel.getPlayer(username);
            var stats = player.stats.arcade.zombies
            this.send(`/gc [${player.rank}] ${player.nickname}: Wins: ${stats.overall.wins} | Kills: ${stats.overall.zombieKills} | Deaths: ${stats.overall.deaths} | Shots: ${stats.bulletsShot} Hits: ${stats.bulletsHit} Accuracy: ${stats.gunAccuracy} Headshot Accuracy ${stats.headshotAccuracy}`);
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
            this.send(
                "There is no player with the given UUID or name or player has never joined Hypixel."
            );
        }
    }
}

module.exports = ZombiesCommand;
