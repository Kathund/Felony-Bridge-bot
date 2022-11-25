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
                    if (mode == 'bedwars') {

                        // check gamemode 
                        if (msg[2] == 'overall') gamemode = 'overall'
                        if (msg[2] == 'solo') gamemode = 'solo'
                        if (msg[2] == 'doubles') gamemode = 'doubles'
                        if (msg[2] == 'threes') gamemode = 'threes'
                        if (msg[2] == 'fours') gamemode = 'fours'
                        if (msg[2] == 'four_two') gamemode = 'four_two'

                        // check stat type
                        if (msg[3] == 'wins') type = 'wins'
                        if (msg[3] == 'finals') type = 'finals'
                        console.log(`/gc Leaderboard info for ${mode} ${gamemode} ${type} | #1 ${getUsername(data[gamemode][type][0].uuid)}: ${data[gamemode][type][0][type]} | #2 ${getUsername(data[gamemode][type][1].uuid)}: ${data[gamemode][type][1][type]} | #3 ${getUsername(data[gamemode][type][2].uuid)}: ${data[gamemode][type][2][type]} | #4 ${getUsername(data[gamemode][type][3].uuid)}: ${data[gamemode][type][3][type]} | #5 ${getUsername(data[gamemode][type][4].uuid)}: ${data[gamemode][type][4][type]} | #6 ${getUsername(data[gamemode][type][5].uuid)}: ${data[gamemode][type][5][type]} | #7 ${getUsername(data[gamemode][type][6].uuid)}: ${data[gamemode][type][6][type]} | #8 ${getUsername(data[gamemode][type][7].uuid)}: ${data[gamemode][type][7][type]} | #9 ${getUsername(data[gamemode][type][8].uuid)}: ${data[gamemode][type][8][type]} | #10 ${getUsername(data[gamemode][type][9].uuid)}: ${data[gamemode][type][9][type]}`)
                    } else if (mode == 'skywars') {
                        // Check gamemode
                        if (msg[2] == 'overall') gamemode = 'overall'
                        if (msg[2] == 'solo') gamemode = 'solo'
                        if (msg[2] == 'teams') gamemode = 'teams'

                        // Check Stat Type
                        if (msg[3] == 'wins') type = 'wins'
                        if (msg[3] == 'kills') type = 'kills'

                        console.log(`/gc Leaderboard info for ${mode} ${gamemode} ${type} | #1 ${getUsername(data[gamemode][type][0].uuid)}: ${data[gamemode][type][0][type]} | #2 ${getUsername(data[gamemode][type][1].uuid)}: ${data[gamemode][type][1][type]} | #3 ${getUsername(data[gamemode][type][2].uuid)}: ${data[gamemode][type][2][type]} | #4 ${getUsername(data[gamemode][type][3].uuid)}: ${data[gamemode][type][3][type]} | #5 ${getUsername(data[gamemode][type][4].uuid)}: ${data[gamemode][type][4][type]} | #6 ${getUsername(data[gamemode][type][5].uuid)}: ${data[gamemode][type][5][type]} | #7 ${getUsername(data[gamemode][type][6].uuid)}: ${data[gamemode][type][6][type]} | #8 ${getUsername(data[gamemode][type][7].uuid)}: ${data[gamemode][type][7][type]} | #9 ${getUsername(data[gamemode][type][8].uuid)}: ${data[gamemode][type][8][type]} | #10 ${getUsername(data[gamemode][type][9].uuid)}: ${data[gamemode][type][9][type]}`)
                    } else if (mode == 'duels') {
                        if (msg[2] == 'overall') gamemode = 'overall'

                        // Check Stat Type
                        if (msg[3] == 'wins') type = 'wins'
                        if (msg[3] == 'kills') type = 'kills'

                        console.log(`/gc Leaderboard info for ${mode} ${gamemode} ${type} | #1 ${getUsername(data[gamemode][type][0].uuid)}: ${data[gamemode][type][0][type]} | #2 ${getUsername(data[gamemode][type][1].uuid)}: ${data[gamemode][type][1][type]} | #3 ${getUsername(data[gamemode][type][2].uuid)}: ${data[gamemode][type][2][type]} | #4 ${getUsername(data[gamemode][type][3].uuid)}: ${data[gamemode][type][3][type]} | #5 ${getUsername(data[gamemode][type][4].uuid)}: ${data[gamemode][type][4][type]} | #6 ${getUsername(data[gamemode][type][5].uuid)}: ${data[gamemode][type][5][type]} | #7 ${getUsername(data[gamemode][type][6].uuid)}: ${data[gamemode][type][6][type]} | #8 ${getUsername(data[gamemode][type][7].uuid)}: ${data[gamemode][type][7][type]} | #9 ${getUsername(data[gamemode][type][8].uuid)}: ${data[gamemode][type][8][type]} | #10 ${getUsername(data[gamemode][type][9].uuid)}: ${data[gamemode][type][9][type]}`)
                    }
                })
            })
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = LeaderBoardCommand;
