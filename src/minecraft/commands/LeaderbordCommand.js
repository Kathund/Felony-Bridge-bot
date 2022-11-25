const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { getUsername } = require("../../contracts/API/PlayerDBAPI.js");
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
                const msg = this.getArgs(message);
                // check mode
                let mode = 'a'
                if (msg[0] == ['bw', 'bedwars', 'bedwar', 'bws']) mode = 'bedwars';
                if (msg[0] == ['sw', 'skywars', 'skywar', 'sws']) mode = 'skywars';
                if (msg[0] == ['duels', 'duel', 'd']) mode = 'duels';
                if (msg[0] == ['general', 'gen', 'g']) mode = 'general';
                if (msg[1] == ['bw', 'bedwars', 'bedwar', 'bws']) mode = 'bedwars';
                if (msg[1] == ['sw', 'skywars', 'skywar', 'sws']) mode = 'skywars';
                if (msg[1] == ['duels', 'duel', 'd']) mode = 'duels';
                if (msg[1] == ['general', 'gen', 'g']) mode = 'general';

                // check timeframe
                let timeframe = 'a'
                if (msg[0] == ['daily', 'day', 'd']) timeframe = 'daily';
                if (msg[0] == ['weekly', 'week', 'w']) timeframe = 'weekly';
                if (msg[0] == ['monthly', 'month', 'm']) timeframe = 'monthly';
                if (msg[0] == ['lifetime', 'alltime', 'all', 'l']) timeframe = 'lifetime';
                if (msg[1] == ['daily', 'day', 'd']) timeframe = 'daily';
                if (msg[1] == ['weekly', 'week', 'w']) timeframe = 'weekly';
                if (msg[1] == ['monthly', 'month', 'm']) timeframe = 'monthly';
                if (msg[1] == ['lifetime', 'alltime', 'all', 'l']) timeframe = 'lifetime';
                fetch(`https://api.pixelic.de/v1/leaderboard?key=${config.api.pixelKey}&mode=${mode}&timeframe=${timeframe}&limit=10`).then((res) => {
                    res.json().then(async (data) => {
                        if (msg[2] == 'wins') {
                            console.log(`#1 ${getUsername(data.overall.wins[0].UUID)}: ${data.overall.wins[0].wins} | #2 ${getUsername(data.overall.wins[1].UUID)}: ${data.overall.wins[1].wins} | #3 ${getUsername(data.overall.wins[2].UUID)}: ${data.overall.wins[2].wins} | #4 ${getUsername(data.overall.wins[3].UUID)}: ${data.overall.wins[3].wins} | #5 ${getUsername(data.overall.wins[4].UUID)}: ${data.overall.wins[4].wins} | #6 ${getUsername(data.overall.wins[5].UUID)}: ${data.overall.wins[5].wins} | #7 ${getUsername(data.overall.wins[6].UUID)}: ${data.overall.wins[6].wins} | #8 ${getUsername(data.overall.wins[7].UUID)}: ${data.overall.wins[7].wins} | #9 ${getUsername(data.overall.wins[8].UUID)}: ${data.overall.wins[8].wins} | #10 ${getUsername(data.overall.wins[9].UUID)}: ${data.overall.wins[9].wins}`)
                        }
                    })
                })
            } else {
                console.log("a")
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = LeaderBoardCommand;
