const { getGuildLeaderboard } = require("../../contracts/helperFunctions.js")
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelAPI.js");
const config = require("../../../config.json")
const fetch = (...args) =>
    import("node-fetch")
        .then(({ default: fetch }) => fetch(...args))
        .catch((err) => console.log(err));

class ExampleCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "example";
        this.aliases = [];
        this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.options = [];
    }

    async onCommand(username, message) {
        const args = this.getArgs(message);
        if (["daily", "weekly", "lifetime"].includes(args[0])) time = args[0];
        if (["bw", "bedwars", "bedwar", "bws", "sw", "skywars", "skywar", "sws", "duels", "duel", "d", "gen", "g", "general"].includes(args[1])) mode = args[1];
        if (["overall", "solo", "doubles", "threes", "fours", "four_two"].includes(args[2])) type = args[2];
        try {
            this.send(await getGuildLeaderboard(time, mode, type))
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = ExampleCommand;
