// const { getGuildLeaderboard } = require("../../contracts/helperFunctions.js")
const minecraftCommand = require("../../contracts/minecraftCommand.js");

class GuildLeaderboard extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);
        
        this.name = "guildleaderborad";
        this.aliases = ["glb", "gleaderboard", "guildlb"];
        this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.options = [];
    }

    async onCommand(username, message) {
        // const args = this.getArgs(message);
        // let time = null
        // let mode = null
        // let type = null
        // if (["daily", "weekly", "lifetime"].includes(args[0])) time = args[0];
        // if (["bw", "bedwars", "bedwar", "bws", "sw", "skywars", "skywar", "sws", "duels", "duel", "d", "gen", "g", "general"].includes(args[1])) mode = args[1];
        // if (["overall", "solo", "doubles", "threes", "fours", "four_two"].includes(args[2])) type = args[2];
        try {
            this.send(`/gc This makes me wanna go die - please help me https://i.imgur.com/1y05SqI.png`)
            // this.send(await getGuildLeaderboard(time, mode, type))
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = GuildLeaderboard;
