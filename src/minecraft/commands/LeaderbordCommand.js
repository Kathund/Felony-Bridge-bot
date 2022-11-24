const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { getUsername } = require("../../contracts/API/PlayerDBAPI.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
    import("node-fetch")
        .then(({ default: fetch }) => fetch(...args))
        .catch((err) => console.log(err));


class LeaderBoardCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "lb";
        this.aliases = [];
        this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.options = [];
    }

    async onCommand(username, message) {
        try {
            if (username == "Udderly_cool") {
                fetch(`https://api.pixelic.de/v1/leaderboard?key=${config.api.pixelKey}&mode=bedwars&timeframe=lifetime&limit=10`).then((res) => {
                    res.json().then(async (data) => {
                        console.log(`#1 ${getUsername(data.overall.wins[0].uuid)} = ${data.overall.wins[0].wins} | #2 ${getUsername(data.overall.wins[1].uuid)} = ${data.overall.wins[1].wins} | #3 ${getUsername(data.overall.wins[2].uuid)} = ${data.overall.wins[2].wins} | #4 ${getUsername(data.overall.wins[3].uuid)} = ${data.overall.wins[3].wins} | #5 ${getUsername(data.overall.wins[4].uuid)} = ${data.overall.wins[4].wins} | #6 ${getUsername(data.overall.wins[5].uuid)} = ${data.overall.wins[5].wins} | #7 ${getUsername(data.overall.wins[6].uuid)} = ${data.overall.wins[6].wins} | #8 ${getUsername(data.overall.wins[7].uuid)} = ${data.overall.wins[7].wins} | #9 ${getUsername(data.overall.wins[8].uuid)} = ${data.overall.wins[8].wins} | #10 ${getUsername(data.overall.wins[9].uuid)} = ${data.overall.wins[9].wins}`);
                    })
                })
            } else {}
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = LeaderBoardCommand;
