const minecraftCommand = require("../../contracts/minecraftCommand.js")
const { getUsername } = require("../../contracts/API/PlayerDBAPI.js")
const config = require("../../../config.json")
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err))

class LeaderBoardCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = "lb"
    this.aliases = []
    this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    this.options = []
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message)
      //check mode
      var mode = "a"

      if (["bw", "bedwars", "bedwar", "bws"].includes(msg[0])) {
        var mode = "bedwars"
      }
      if (["sw", "skywars", "skywar", "sws"].includes(msg[0])) {
        var mode = "skywars"
      }
      if (["duels", "duel", "d"].includes(msg[0])) {
        var mode = "duels"
      }
      if (["general", "gen", "g"].includes(msg[0])) {
        var mode = "general"
      }
      if (["bw", "bedwars", "bedwar", "bws"].includes(msg[1])) {
        var mode = "bedwars"
      }
      if (["sw", "skywars", "skywar", "sws"].includes(msg[1])) {
        var mode = "skywars"
      }
      if (["duels", "duel", "d"].includes(msg[1])) {
        var mode = "duels"
      }
      if (["general", "gen", "g"].includes(msg[1])) {
        var mode = "general"
      }

      //check timeframe
      var timeframe = "a"
      if (["daily", "day", "d"].includes(msg[0])) {
        var timeframe = "daily"
      }
      if (["weekly", "week", "w"].includes(msg[0])) {
        var timeframe = "weekly"
      }
      if (["monthly", "month", "m"].includes(msg[0])) {
        var timeframe = "monthly"
      }
      if (["lifetime", "alltime", "all", "l"].includes(msg[0])) {
        var timeframe = "lifetime"
      }
      if (["daily", "day", "d"].includes(msg[1])) {
        var timeframe = "daily"
      }
      if (["weekly", "week", "w"].includes(msg[1])) {
        var timeframe = "weekly"
      }
      if (["monthly", "month", "m"].includes(msg[1])) {
        var timeframe = "monthly"
      }
      if (["lifetime", "alltime", "all", "l"].includes(msg[1])) {
        var timeframe = "lifetime"
      }

      console.log(mode, timeframe)
      fetch(`https://api.pixelic.de/v1/leaderboard?key=${config.api.pixelKey}&mode=${mode}&timeframe=${timeframe}&limit=10`).then((res) => {
        res.json().then(async (data) => {
          let gamemode = null
          let type = null
          if (mode == "bedwars") {
            //check gamemode
            if (msg[2] == "overall") gamemode = "overall"
            if (msg[2] == "solo") gamemode = "solo"
            if (msg[2] == "doubles") gamemode = "doubles"
            if (msg[2] == "threes") gamemode = "threes"
            if (msg[2] == "fours") gamemode = "fours"
            if (msg[2] == "four_two") gamemode = "four_two"

            //check stat type
            if (msg[3] == "wins") type = "wins"
            if (msg[3] == "finals") type = "finals"
            this.send(
              `/gc Leaderboard info for ${mode} ${gamemode} ${type} | #1 ${await getUsername(data[gamemode][type][0].uuid)}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(data[gamemode][type][1].uuid)}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(data[gamemode][type][2].uuid)}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(data[gamemode][type][3].uuid)}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(data[gamemode][type][4].uuid)}: ${
                data[gamemode][type][4][type]
              } | #6 ${await getUsername(data[gamemode][type][5].uuid)}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(data[gamemode][type][6].uuid)}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(data[gamemode][type][7].uuid)}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(data[gamemode][type][8].uuid)}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(data[gamemode][type][9].uuid)}: ${data[gamemode][type][9][type]}`
            )
            console.log(
              `/gc Leaderboard info for ${mode} ${gamemode} ${type} | #1 ${await getUsername(data[gamemode][type][0].uuid)}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(data[gamemode][type][1].uuid)}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(data[gamemode][type][2].uuid)}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(data[gamemode][type][3].uuid)}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(data[gamemode][type][4].uuid)}: ${
                data[gamemode][type][4][type]
              } | #6 ${await getUsername(data[gamemode][type][5].uuid)}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(data[gamemode][type][6].uuid)}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(data[gamemode][type][7].uuid)}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(data[gamemode][type][8].uuid)}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(data[gamemode][type][9].uuid)}: ${data[gamemode][type][9][type]}`
            )
          } else if (mode == "skywars") {
            //Check gamemode
            if (msg[2] == "overall") gamemode = "overall"
            if (msg[2] == "solo") gamemode = "solo"
            if (msg[2] == "teams") gamemode = "teams"

            //  Check Stat Type
            if (msg[3] == "wins") type = "wins"
            if (msg[3] == "kills") type = "kills"

            console.log(
              `/gc Leaderboard info for ${mode} ${gamemode} ${type} | #1 ${await getUsername(data[gamemode][type][0].uuid)}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(data[gamemode][type][1].uuid)}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(data[gamemode][type][2].uuid)}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(data[gamemode][type][3].uuid)}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(data[gamemode][type][4].uuid)}: ${
                data[gamemode][type][4][type]
              } | #6 ${await getUsername(data[gamemode][type][5].uuid)}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(data[gamemode][type][6].uuid)}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(data[gamemode][type][7].uuid)}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(data[gamemode][type][8].uuid)}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(data[gamemode][type][9].uuid)}: ${data[gamemode][type][9][type]}`
            )
          } else if (mode == "duels") {
            if (msg[2] == "overall") gamemode = "overall"

            // Check Stat Type
            if (msg[3] == "wins") type = "wins"
            if (msg[3] == "kills") type = "kills"

            console.log(
              `/gc Leaderboard info for ${mode} ${gamemode} ${type} | #1 ${await getUsername(data[gamemode][type][0].uuid)}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(data[gamemode][type][1].uuid)}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(data[gamemode][type][2].uuid)}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(data[gamemode][type][3].uuid)}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(data[gamemode][type][4].uuid)}: ${
                data[gamemode][type][4][type]
              } | #6 ${await getUsername(data[gamemode][type][5].uuid)}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(data[gamemode][type][6].uuid)}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(data[gamemode][type][7].uuid)}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(data[gamemode][type][8].uuid)}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(data[gamemode][type][9].uuid)}: ${data[gamemode][type][9][type]}`
            )
          }
        })
      })
    } catch (error) {
      console.log(error)
      this.send("/gc Something went wrong..")
    }
  }
}

module.exports = LeaderBoardCommand
