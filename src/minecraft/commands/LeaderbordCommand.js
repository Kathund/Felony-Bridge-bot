const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { getUUID } = require("../../contracts/API/PlayerDBAPI.js");
const config = require("../../../config.json")
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
                    res.json().then((data) => {
                        var date = new Date(data.lastUpdated * 1000);
                        console.log(date.toLocaleTimeString("en-US"));
                        console.log(data.four_two.wins);
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
