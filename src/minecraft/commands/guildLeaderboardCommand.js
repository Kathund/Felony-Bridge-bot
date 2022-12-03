const minecraftCommand = require("../../contracts/minecraftCommand.js")
const config = require("../../../config.json")
const hypixel = require("../../contracts/API/HypixelRebornAPI.js")
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err))

const axios = require("axios")
async function getUsername(UUID) {
  const fetch = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`)
  return fetch.data.name
}
async function getUUID(Username) {
  const fetch = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${Username}`)
  return fetch.data.id
}

class GuildLeaderboardCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = "glb"
    this.aliases = ["guildlb", "guildleaderboard"]
    this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    this.options = []
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message)
      //check mode
      var mode

      if (["bw", "bedwars", "bedwar", "bws"].includes(msg[0])) {
        var mode = "Bedwars"
      }
      if (["sw", "skywars", "skywar", "sws"].includes(msg[0])) {
        var mode = "Skywars"
      }
      if (["duels", "duel", "d"].includes(msg[0])) {
        var mode = "Duels"
      }
      if (["general", "gen", "g"].includes(msg[0])) {
        var mode = "General"
      }
      if (["bw", "bedwars", "bedwar", "bws"].includes(msg[1])) {
        var mode = "Bedwars"
      }
      if (["sw", "skywars", "skywar", "sws"].includes(msg[1])) {
        var mode = "Skywars"
      }
      if (["duels", "duel", "d"].includes(msg[1])) {
        var mode = "Duels"
      }
      if (["general", "gen", "g"].includes(msg[1])) {
        var mode = "General"
      }

      //check timeframe
      var timeframe
      if (["daily", "day", "d"].includes(msg[0])) {
        var timeframe = "Daily"
      }
      if (["weekly", "week", "w"].includes(msg[0])) {
        var timeframe = "Weekly"
      }
      if (["monthly", "month", "m"].includes(msg[0])) {
        var timeframe = "Monthly"
      }
      if (["lifetime", "alltime", "all", "l"].includes(msg[0])) {
        var timeframe = "Lifetime"
      }
      if (["daily", "day", "d"].includes(msg[1])) {
        var timeframe = "Daily"
      }
      if (["weekly", "week", "w"].includes(msg[1])) {
        var timeframe = "Weekly"
      }
      if (["monthly", "month", "m"].includes(msg[1])) {
        var timeframe = "Monthly"
      }
      if (["lifetime", "alltime", "all", "l"].includes(msg[1])) {
        var timeframe = "Lifetime"
      }

      fetch(`https://api.pixelic.de/v1/leaderboard/guild?key=${config.api.pixelKey}&mode=${mode.toLowerCase()}&timeframe=${timeframe.toLowerCase()}&limit=10&uuid=${await getUUID(username)}`).then((res) => {
        res.json().then(async (data) => {
          var gamemode
          var gamemodeFormatted
          var type
          var typeFormatted
          if (mode.toLowerCase() == "bedwars") {
            //check gamemode
            if (msg[2] == "overall") {
              var gamemode = "overall"
              var gamemodeFormatted = "Overall"
            }
            if (msg[2] == "solo") {
              var gamemode = "solo"
              var gamemodeFormatted = "Solo"
            }
            if (msg[2] == "doubles") {
              var gamemode = "doubles"
              var gamemodeFormatted = "Doubles"
            }
            if (msg[2] == "threes") {
              var gamemode = "threes"
              var gamemodeFormatted = "threes"
            }
            if (msg[2] == "fours") {
              var gamemode = "fours"
              var gamemodeFormatted = "Fours"
            }
            if (["four_two", "4v4"].includes(msg[2])) {
              var gamemode = "four_two"
              var gamemodeFormatted = "4v4"
            }

            //check stat type
            if (msg[3] == "wins") {
              var type = "wins"
              var typeFormatted = "Wins"
            }
            if (msg[3] == "losses") {
              var type = "losses"
              var typeFormatted = "Losses"
            }
            if (msg[3] == "wlr") {
              var type = "wlr"
              var typeFormatted = "WLR"
            }
            if (["finals", "finalkills", "fk", "fks", "fkill", "fkills"].includes(msg[3])) {
              var type = "finalKills"
              var typeFormatted = "Finalkills"
            }
            if (["finaldeaths", "fd", "fds", "fdeath", "fdeaths"].includes(msg[3])) {
              var type = "finalDeaths"
              var typeFormatted = "Finaldeaths"
            }
            if (msg[3] == "fkdr") {
              var type = "fkdr"
              var typeFormatted = "FKDR"
            }
            if (["kills", "k"].includes(msg[3])) {
              var type = "kills"
              var typeFormatted = "Kills"
            }
            if (["deaths", "d"].includes(msg[3])) {
              var type = "deaths"
              var typeFormatted = "Deaths"
            }
            if (msg[3] == "kdr") {
              var type = "kdr"
              var typeFormatted = "KDR"
            }
            if (["bedsbroken", "bb"].includes(msg[3])) {
              var type = "bedsBroken"
              var typeFormatted = "BedsBroken"
            }
            if (["bedslost", "bl"].includes(msg[3])) {
              var type = "bedsLost"
              var typeFormatted = "BedsLost"
            }
            if (msg[3] == "bblr") {
              var type = "bblr"
              var typeFormatted = "BBLR"
            }
            this.send(
              `/gc [Guild] ${timeframe} ${mode} ${gamemodeFormatted} ${typeFormatted} » #1 ${await getUsername(data[gamemode][type][0].UUID)}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(data[gamemode][type][1].UUID)}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(data[gamemode][type][2].UUID)}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(data[gamemode][type][3].UUID)}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(data[gamemode][type][4].UUID)}: ${
                data[gamemode][type][4][type]
              } | #6 ${await getUsername(data[gamemode][type][5].UUID)}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(data[gamemode][type][6].UUID)}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(data[gamemode][type][7].UUID)}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(data[gamemode][type][8].UUID)}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(data[gamemode][type][9].UUID)}: ${data[gamemode][type][9][type]}`
            )
          } else if (mode.toLowerCase() == "skywars") {
            //Check gamemode
            if (msg[2] == "overall") {
              var gamemode = "overall"
              var gamemodeFormatted = "Overall"
            }
            if (msg[2] == "solo") {
              var gamemode = "solo"
              var gamemodeFormatted = "Solo"
            }
            if (["teams", "doubles"].includes(msg[2])) {
              var gamemode = "doubles"
              var gamemodeFormatted = "Doubles"
            }

            //  Check Stat Type
            if (msg[3] == "wins") {
              var type = "wins"
              var typeFormatted = "Wins"
            }
            if (msg[3] == "losses") {
              var type = "losses"
              var typeFormatted = "Losses"
            }
            if (msg[3] == "wlr") {
              var type = "wlr"
              var typeFormatted = "WLR"
            }
            if (msg[3] == "fkdr") {
              var type = "fkdr"
              var typeFormatted = "FKDR"
            }
            if (["kills", "k"].includes(msg[3])) {
              var type = "kills"
              var typeFormatted = "Kills"
            }
            if (["deaths", "d"].includes(msg[3])) {
              var type = "deaths"
              var typeFormatted = "Deaths"
            }
            if (msg[3] == "kdr") {
              var type = "kdr"
              var typeFormatted = "KDR"
            }

            this.send(
              `/gc [Guild] ${timeframe} ${mode} ${gamemodeFormatted} ${typeFormatted} » #1 ${await getUsername(data[gamemode][type][0].UUID)}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(data[gamemode][type][1].UUID)}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(data[gamemode][type][2].UUID)}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(data[gamemode][type][3].UUID)}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(data[gamemode][type][4].UUID)}: ${
                data[gamemode][type][4][type]
              } | #6 ${await getUsername(data[gamemode][type][5].UUID)}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(data[gamemode][type][6].UUID)}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(data[gamemode][type][7].UUID)}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(data[gamemode][type][8].UUID)}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(data[gamemode][type][9].UUID)}: ${data[gamemode][type][9][type]}`
            )
          } else if (mode.toLowerCase() == "duels") {
            if (msg[2] == "overall") {
              var gamemode = "overall"
              var gamemodeFormatted = "Overall"
            }

            // Check Stat Type
            if (msg[3] == "wins") {
              var type = "wins"
              var typeFormatted = "Wins"
            }
            if (msg[3] == "losses") {
              var type = "losses"
              var typeFormatted = "Losses"
            }
            if (msg[3] == "wlr") {
              var type = "wlr"
              var typeFormatted = "WLR"
            }
            if (msg[3] == "fkdr") {
              var type = "fkdr"
              var typeFormatted = "FKDR"
            }
            if (["kills", "k"].includes(msg[3])) {
              var type = "kills"
              var typeFormatted = "Kills"
            }
            if (["deaths", "d"].includes(msg[3])) {
              var type = "deaths"
              var typeFormatted = "Deaths"
            }
            if (msg[3] == "kdr") {
              var type = "kdr"
              var typeFormatted = "KDR"
            }

            this.send(
              `/gc [Guild] ${timeframe} ${mode} ${gamemodeFormatted} ${typeFormatted} » #1 ${await getUsername(data[gamemode][type][0].UUID)}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(data[gamemode][type][1].UUID)}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(data[gamemode][type][2].UUID)}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(data[gamemode][type][3].UUID)}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(data[gamemode][type][4].UUID)}: ${
                data[gamemode][type][4][type]
              } | #6 ${await getUsername(data[gamemode][type][5].UUID)}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(data[gamemode][type][6].UUID)}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(data[gamemode][type][7].UUID)}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(data[gamemode][type][8].UUID)}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(data[gamemode][type][9].UUID)}: ${data[gamemode][type][9][type]}`
            )
          } else if (mode.toLowerCase() == "general") {
            // Check Stat Type
            if (msg[2] == "level") {
              var type = "level"
              var typeFormatted = "Level"
            }
            if (msg[2] == "karma") {
              var type = "karma"
              var typeFormatted = "Karma"
            }
            if (["quest", "quests"].includes(msg[2])) {
              var type = "quests"
              var typeFormatted = "Quests"
            }
            if (["points", "achievementpoints", "ap"].includes(msg[2])) {
              var type = "achievementPoints"
              var typeFormatted = "Achievement Points"
            }

            this.send(
              `/gc [Guild] ${timeframe} ${mode} ${typeFormatted} » #1 ${await getUsername(data[type][0].UUID)}: ${data[type][0][type]} | #2 ${await getUsername(data[type][1].UUID)}: ${data[type][1][type]} | #3 ${await getUsername(data[type][2].UUID)}: ${data[type][2][type]} | #4 ${await getUsername(data[type][3].UUID)}: ${data[type][3][type]} | #5 ${await getUsername(data[type][4].UUID)}: ${data[type][4][type]} | #6 ${await getUsername(data[type][5].UUID)}: ${data[type][5][type]} | #7 ${await getUsername(
                data[type][6].UUID
              )}: ${data[type][6][type]} | #8 ${await getUsername(data[type][7].UUID)}: ${data[type][7][type]} | #9 ${await getUsername(data[type][8].UUID)}: ${data[type][8][type]} | #10 ${await getUsername(data[type][9].UUID)}: ${data[type][9][type]}`
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

module.exports = GuildLeaderboardCommand
