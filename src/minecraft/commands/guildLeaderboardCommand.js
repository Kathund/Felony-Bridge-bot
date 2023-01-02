const { getUUID, getUsername } = require("../../contracts/API/MojangAPI.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class GuildLeaderboardCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "guildleaderboard";
    this.aliases = ["guildlb", "glb"];
    this.description = "Allows you to look up guild specific leaderboards";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message);
      //check mode
      var mode;

      if (["bw", "bedwars", "bedwar", "bws"].includes(msg[0])) mode = "Bedwars";
      if (["sw", "skywars", "skywar", "sws"].includes(msg[0])) mode = "Skywars";
      if (["duels", "duel", "d"].includes(msg[0])) mode = "Duels";
      if (["general", "gen", "g"].includes(msg[0])) mode = "General";
      if (["bw", "bedwars", "bedwar", "bws"].includes(msg[1])) mode = "Bedwars";
      if (["sw", "skywars", "skywar", "sws"].includes(msg[1])) mode = "Skywars";
      if (["duels", "duel", "d"].includes(msg[1])) mode = "Duels";
      if (["general", "gen", "g"].includes(msg[1])) mode = "General";

      //check timeframe
      var timeframe;
      if (["daily", "day", "d"].includes(msg[0])) timeframe = "Daily";
      if (["weekly", "week", "w"].includes(msg[0])) timeframe = "Weekly";
      if (["monthly", "month", "m"].includes(msg[0])) timeframe = "Monthly";
      if (["lifetime", "alltime", "all", "l"].includes(msg[0])) {
        timeframe = "Lifetime";
      }
      if (["daily", "day", "d"].includes(msg[1])) timeframe = "Daily";
      if (["weekly", "week", "w"].includes(msg[1])) timeframe = "Weekly";
      if (["monthly", "month", "m"].includes(msg[1])) timeframe = "Monthly";
      if (["lifetime", "alltime", "all", "l"].includes(msg[1])) {
        timeframe = "Lifetime";
      }



      fetch(`${config.api.pixelicAPI}/guildleaderboard/${timeframe.toLowerCase()}/${mode.toLowerCase()}?key=${config.api.pixelicKey}&uuid=${await getUUID(username)}`).then((res) => res.json()).then(async (data) => {

        var gamemode = null;
        var gamemodeFormatted = null;
        var type = null;
        var typeFormatted = null;
        if (mode.toLowerCase() == "bedwars") {
          //check gamemode
          if (msg[2] == "overall") {
            (gamemode = "overall"), (gamemodeFormatted = "Overall");
          }
          if (msg[2] == "solo") {
            (gamemode = "solo"), (gamemodeFormatted = "Solo");
          }
          if (msg[2] == "doubles") {
            (gamemode = "doubles"), (gamemodeFormatted = "Doubles");
          }
          if (msg[2] == "threes") {
            (gamemode = "threes"), (gamemodeFormatted = "threes");
          }
          if (msg[2] == "fours") {
            (gamemode = "fours"), (gamemodeFormatted = "Fours");
          }
          if (["four_two", "4v4"].includes(msg[2])) {
            (gamemode = "four_two"), (gamemodeFormatted = "4v4");
          }

          //check stat type
          if (msg[3] == "wins") (type = "wins"), (typeFormatted = "Wins");
          if (msg[3] == "losses") {
            (type = "losses"), (typeFormatted = "Losses");
          }
          if (msg[3] == "wlr") (type = "wlr"), (typeFormatted = "WLR");
          if (
            ["finals", "finalkills", "fk", "fks", "fkill", "fkills"].includes(
              msg[3]
            )
          ) {
            (type = "finalKills"), (typeFormatted = "Finalkills");
          }
          if (
            ["finaldeaths", "fd", "fds", "fdeath", "fdeaths"].includes(msg[3])
          ) {
            (type = "finalDeaths"), (typeFormatted = "Finaldeaths");
          }
          if (msg[3] == "fkdr") (type = "fkdr"), (typeFormatted = "FKDR");
          if (["kills", "k"].includes(msg[3])) {
            (type = "kills"), (typeFormatted = "Kills");
          }
          if (["deaths", "d"].includes(msg[3])) {
            (type = "deaths"), (typeFormatted = "Deaths");
          }
          if (msg[3] == "kdr") (type = "kdr"), (typeFormatted = "KDR");
          if (["bedsbroken", "bb"].includes(msg[3])) {
            (type = "bedsBroken"), (typeFormatted = "BedsBroken");
          }
          if (["bedslost", "bl"].includes(msg[3])) {
            (type = "bedsLost"), (typeFormatted = "BedsLost");
          }
          if (msg[3] == "bblr") (type = "bblr"), (typeFormatted = "BBLR");

          this.send(
            `/gc [Guild] ${timeframe} ${mode} ${gamemodeFormatted} ${typeFormatted} » #1 ${await getUsername(
              data[gamemode][type][0].UUID
            )}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(
              data[gamemode][type][1].UUID
            )}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(
              data[gamemode][type][2].UUID
            )}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(
              data[gamemode][type][3].UUID
            )}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(
              data[gamemode][type][4].UUID
            )}: ${data[gamemode][type][4][type]} | #6 ${await getUsername(
              data[gamemode][type][5].UUID
            )}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(
              data[gamemode][type][6].UUID
            )}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(
              data[gamemode][type][7].UUID
            )}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(
              data[gamemode][type][8].UUID
            )}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(
              data[gamemode][type][9].UUID
            )}: ${data[gamemode][type][9][type]}`
          );
        } else if (mode.toLowerCase() == "skywars") {
          //Check gamemode
          if (msg[2] == "overall") {
            (gamemode = "overall"), (gamemodeFormatted = "Overall");
          }
          if (msg[2] == "solo") {
            (gamemode = "solo"), (gamemodeFormatted = "Solo");
          }
          if (["teams", "doubles"].includes(msg[2])) {
            (gamemode = "doubles"), (gamemodeFormatted = "Doubles");
          }

          //  Check Stat Type
          if (msg[3] == "wins") (type = "wins"), (typeFormatted = "Wins");
          if (msg[3] == "losses") {
            (type = "losses"), (typeFormatted = "Losses");
          }
          if (msg[3] == "wlr") (type = "wlr"), (typeFormatted = "WLR");
          if (["kills", "k"].includes(msg[3])) {
            (type = "kills"), (typeFormatted = "Kills");
          }
          if (["deaths", "d"].includes(msg[3])) {
            (type = "deaths"), (typeFormatted = "Deaths");
          }
          if (msg[3] == "kdr") (type = "kdr"), (typeFormatted = "KDR");

          this.send(
            `/gc [Guild] ${timeframe} ${mode} ${gamemodeFormatted} ${typeFormatted} » #1 ${await getUsername(
              data[gamemode][type][0].UUID
            )}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(
              data[gamemode][type][1].UUID
            )}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(
              data[gamemode][type][2].UUID
            )}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(
              data[gamemode][type][3].UUID
            )}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(
              data[gamemode][type][4].UUID
            )}: ${data[gamemode][type][4][type]} | #6 ${await getUsername(
              data[gamemode][type][5].UUID
            )}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(
              data[gamemode][type][6].UUID
            )}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(
              data[gamemode][type][7].UUID
            )}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(
              data[gamemode][type][8].UUID
            )}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(
              data[gamemode][type][9].UUID
            )}: ${data[gamemode][type][9][type]}`
          );
        } else if (mode.toLowerCase() == "duels") {
          if (msg[2] == "overall") {
            (gamemode = "overall"), (gamemodeFormatted = "Overall");
          }

          // Check Stat Type
          if (msg[3] == "wins") (type = "wins"), (typeFormatted = "Wins");
          if (msg[3] == "losses") {
            (type = "losses"), (typeFormatted = "Losses");
          }
          if (msg[3] == "wlr") (type = "wlr"), (typeFormatted = "WLR");
          if (msg[3] == "fkdr") (type = "fkdr"), (typeFormatted = "FKDR");
          if (["kills", "k"].includes(msg[3])) {
            (type = "kills"), (typeFormatted = "Kills");
          }
          if (["deaths", "d"].includes(msg[3])) {
            (type = "deaths"), (typeFormatted = "Deaths");
          }
          if (msg[3] == "kdr") (type = "kdr"), (typeFormatted = "KDR");

          this.send(
            `/gc [Guild] ${timeframe} ${mode} ${gamemodeFormatted} ${typeFormatted} » #1 ${await getUsername(
              data[gamemode][type][0].UUID
            )}: ${data[gamemode][type][0][type]} | #2 ${await getUsername(
              data[gamemode][type][1].UUID
            )}: ${data[gamemode][type][1][type]} | #3 ${await getUsername(
              data[gamemode][type][2].UUID
            )}: ${data[gamemode][type][2][type]} | #4 ${await getUsername(
              data[gamemode][type][3].UUID
            )}: ${data[gamemode][type][3][type]} | #5 ${await getUsername(
              data[gamemode][type][4].UUID
            )}: ${data[gamemode][type][4][type]} | #6 ${await getUsername(
              data[gamemode][type][5].UUID
            )}: ${data[gamemode][type][5][type]} | #7 ${await getUsername(
              data[gamemode][type][6].UUID
            )}: ${data[gamemode][type][6][type]} | #8 ${await getUsername(
              data[gamemode][type][7].UUID
            )}: ${data[gamemode][type][7][type]} | #9 ${await getUsername(
              data[gamemode][type][8].UUID
            )}: ${data[gamemode][type][8][type]} | #10 ${await getUsername(
              data[gamemode][type][9].UUID
            )}: ${data[gamemode][type][9][type]}`
          );
        } else if (mode.toLowerCase() == "general") {
          // Check Stat Type
          if (msg[2] == "level") (type = "level"), (typeFormatted = "Level");
          if (msg[2] == "karma") (type = "karma"), (typeFormatted = "Karma");
          if (["quest", "quests"].includes(msg[2])) {
            (type = "quests"), (typeFormatted = "Quests");
          }
          if (["points", "achievementpoints", "ap"].includes(msg[2])) {
            (type = "achievementPoints"),
              (typeFormatted = "Achievement Points");
          }

          this.send(
            `/gc [Guild] ${timeframe} ${mode} ${typeFormatted} » #1 ${await getUsername(
              data[type][0].UUID
            )}: ${data[type][0][type]} | #2 ${await getUsername(
              data[type][1].UUID
            )}: ${data[type][1][type]} | #3 ${await getUsername(
              data[type][2].UUID
            )}: ${data[type][2][type]} | #4 ${await getUsername(
              data[type][3].UUID
            )}: ${data[type][3][type]} | #5 ${await getUsername(
              data[type][4].UUID
            )}: ${data[type][4][type]} | #6 ${await getUsername(
              data[type][5].UUID
            )}: ${data[type][5][type]} | #7 ${await getUsername(
              data[type][6].UUID
            )}: ${data[type][6][type]} | #8 ${await getUsername(
              data[type][7].UUID
            )}: ${data[type][7][type]} | #9 ${await getUsername(
              data[type][8].UUID
            )}: ${data[type][8][type]} | #10 ${await getUsername(
              data[type][9].UUID
            )}: ${data[type][9][type]}`
          );
        }
      });
    } catch (error) {
      await logError(username, error);
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GuildLeaderboardCommand;
