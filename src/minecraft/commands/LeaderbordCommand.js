const minecraftCommand = require("../../contracts/minecraftCommand.js");
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
                        var date = new Date(data.lastUpdated * 1000);
                        console.log(`${data.lastUpdated} = ${date.toLocaleTimeString("en-US")}`);
                        console.log(data.four_two.wins);
                        var a = data.four_two.wins[0].UUID
                        console.log(a)
                        var b = await hypixel.getPlayer(a)
                        console.log(b.nickname)
                        console.log(``)
                        this.send(`/gc ${b.nickname} ${data.four_two.wins[0].wins}`);
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
