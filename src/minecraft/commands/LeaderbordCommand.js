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
                        var player1 = await getUsername(data.overall.wins[0].uuid);
                        var player2 = await getUsername(data.overall.wins[1].uuid);
                        var player3 = await getUsername(data.overall.wins[2].uuid);
                        var player4 = await getUsername(data.overall.wins[3].uuid);
                        var player5 = await getUsername(data.overall.wins[4].uuid);
                        var player6 = await getUsername(data.overall.wins[5].uuid);
                        var player7 = await getUsername(data.overall.wins[6].uuid);
                        var player8 = await getUsername(data.overall.wins[7].uuid);
                        var player9 = await getUsername(data.overall.wins[8].uuid);
                        var player10 = await getUsername(data.overall.wins[9].uuid);
                    })
                })
            } else {
                this.send("You are not Udderly_cool");
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = LeaderBoardCommand;
