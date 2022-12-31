const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addCommas, register } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

// Bedwars Level Calculator
const EASY_LEVELS = 4;
const EASY_LEVELS_XP = 7000;
const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
const LEVELS_PER_PRESTIGE = 100;
const HIGHEST_PRESTIGE = 30;

function getExpForLevel(level) {
  if (level == 0) return 0;

  var respectedLevel = getLevelRespectingPrestige(level);
  if (respectedLevel > EASY_LEVELS) {
    return 5000;
  }

  switch (respectedLevel) {
    case 1:
      return 500;
    case 2:
      return 1000;
    case 3:
      return 2000;
    case 4:
      return 3500;
  }
  return 5000;
}

function getLevelRespectingPrestige(level) {
  if (level > HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE) {
    return level - HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE;
  } else {
    return level % LEVELS_PER_PRESTIGE;
  }
}

function getBedwarsLevel(exp) {
  var prestiges = Math.floor(exp / XP_PER_PRESTIGE);
  var level = prestiges * LEVELS_PER_PRESTIGE;
  var expWithoutPrestiges = exp - prestiges * XP_PER_PRESTIGE;

  for (let i = 1; i <= EASY_LEVELS; ++i) {
    var expForEasyLevel = getExpForLevel(i);
    if (expWithoutPrestiges < expForEasyLevel) {
      break;
    }
    level++;
    expWithoutPrestiges -= expForEasyLevel;
  }
  return level + expWithoutPrestiges / 5000;
}

// function getSkywarsLevel(exp) {
//   var xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
//   let exactLevel = 0;
//   if (exp >= 15000) {
//     exactLevel = (exp - 15000) / 10000 + 12;
//   } else {
//     for (let i = 0; i < xps.length; i++) {
//       if (exp < xps[i]) {
//         exactLevel = i + (exp - xps[i - 1]) / (xps[i] - xps[i - 1]);
//         break;
//       }
//     }
//   }

//   return exactLevel;
// }

class DailyStatsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "daily";
    this.aliases = [""];
    this.description = "Get your daily stats";
    this.options = ["name", "gamemode"];
    this.optionsDescription = ["Minecraft Username", "Hypixel Gamemode"];
  }


  async onCommand(username, message) {
    const args = this.getArgs(message);
    let mode,
      player = username;

    if (
      [
        "bw",
        "bedwars",
        "bedwar",
        "bws",
        "sw",
        "skywars",
        "skywar",
        "sws",
        "duels",
        "duel",
        "d",
        "gen",
        "g",
        "general",
      ].includes(args[0])
    ) {
      mode = args[0];
      if (args[1]) player = args[1];
    }
    if (
      [
        "bw",
        "bedwars",
        "bedwar",
        "bws",
        "sw",
        "skywars",
        "skywar",
        "sws",
        "duels",
        "duel",
        "d",
        "gen",
        "g",
        "general",
      ].includes(args[1])
    ) {
      mode = args[1];
      player = args[0];
    }

    const uuid = await getUUID(player);

    try {
      fetch(`${config.api.hypixelAPI}/player?uuid=${uuid}&key=${config.api.hypixelAPIkey}`).then((res) => res.json()).then(async (response) => {
        fetch(`${config.api.pixelicAPI}/player/daily/${uuid}?key=${config.api.pixelicKey}`).then((res) => res.json()).then(async (response24H) => {

          var responseNew = await hypixel.getPlayer(uuid)

          if (["gen", "general", "g"].includes(mode.toLowerCase())) {
            const generalData = responseNew.stats
            const oldGeneralData = response24H.General;
            var generalKarma =
              generalData.karma === undefined
                ? 0
                : generalData.karma - oldGeneralData.karma;
            this.send(`/gc ${player} gained ${generalKarma} karma | in the last 24 hours`)
          } else if (["bw", "bedwars", "bedwar", "bws"].includes(mode.toLowerCase())) {
            const bedwarsData = responseNew.stats.bedwars
            const oldBedwarsData = response24H.Bedwars

            const bedwarsLevel = (getBedwarsLevel(response.player.stats.Bedwars.Experience - oldBedwarsData.EXP)).toFixed(2);

            var bedwarsWins =
              bedwarsData.wins === undefined
                ? 0
                : bedwarsData.wins - oldBedwarsData.overall.wins
            var bedwarsLosses =
              bedwarsData.losses_bedwars === undefined
                ? 0
                : bedwarsData.losses_bedwars - oldBedwarsData.overall.losses
            var bedwarsFinalKills =
              bedwarsData.finalKills === undefined
                ? 0
                : bedwarsData.finalKills - oldBedwarsData.overall.finalKills
            var bedwarsFinalDeaths =
              bedwarsData.finalDeaths === undefined
                ? 0
                : bedwarsData.finalDeaths - oldBedwarsData.overall.finalDeaths
            var bedwarsBedsBroken =
              bedwarsData.beds.broken === undefined
                ? 0
                : bedwarsData.beds.broken - oldBedwarsData.overall.bedsBroken
            var bedwarsBedsLost =
              bedwarsData.beds.lost === undefined
                ? 0
                : bedwarsData.beds.lost - oldBedwarsData.overall.bedsLost

            if (bedwarsWins == "0") {
              var bedwarsWlr1 = "0";
            } else if (bedwarsLosses == "0") {
              var bedwarsWlr2 = bedwarsWins;
            } else {
              var bedwarsWlr3 = (bedwarsWins / bedwarsLosses).toFixed(2);
            }
            if (bedwarsFinalKills == "0") {
              var bedwarsFkdr1 = "0";
            } else if (bedwarsFinalDeaths == "0") {
              var bedwarsFkdr2 = bedwarsFinalKills;
            } else {
              var bedwarsFkdr3 = (bedwarsFinalKills / bedwarsFinalDeaths).toFixed(2);
            }
            if (bedwarsBedsBroken == "0") {
              var bedwarsBblr1 = "0";
            } else if (bedwarsBedsLost == "0") {
              var bedwarsBblr2 = bedwarsBedsBroken;
            } else {
              var bedwarsBblr3 = (bedwarsBedsBroken / bedwarsBedsLost).toFixed(2);
            }

            var bedwarsWlr = bedwarsWlr1 || bedwarsWlr2 || bedwarsWlr3;
            var bedwarsFkdr = bedwarsFkdr1 || bedwarsFkdr2 || bedwarsFkdr3;
            var bedwarsBblr = bedwarsBblr1 || bedwarsBblr2 || bedwarsBblr3;

            this.send(`/gc [${bedwarsLevel}✫] ${player} | FK: ${addCommas(bedwarsFinalKills)} FKDR: ${bedwarsFkdr} | Wins: ${addCommas(bedwarsWins)} WLR: ${bedwarsWlr} | BB: ${addCommas(bedwarsBedsBroken)} BLR: ${bedwarsBblr} | in the last 24 hours`)
          } else if (["sw", "skywars", "skywar", "sws"].includes(mode.toLowerCase())) {
            const skywarsData = responseNew.stats.skywars
            const oldSkywarsData = response24H.Skywars;

            // console.log(response.player.stats.Skywars)

            // const skywarsLevel = (
            //   getSkywarsLevel(response.player.stats.Skywars.skywars_experience) - oldSkywarsData.levelRaw
            // ).toFixed(3);

            var skywarsWins =
              skywarsData.wins === undefined
                ? 0
                : skywarsData.wins - oldSkywarsData.overall.wins;
            var skywarsLosses =
              skywarsData.losses === undefined
                ? 0
                : skywarsData.losses - oldSkywarsData.overall.losses;
            var skywarsKills =
              skywarsData.kills === undefined
                ? 0
                : skywarsData.kills - oldSkywarsData.overall.kills;
            var skywarsDeaths =
              skywarsData.deaths === undefined
                ? 0
                : skywarsData.deaths - oldSkywarsData.overall.deaths;

            if (skywarsWins == "0") {
              var skywarsWlr1 = "0";
            } else if (skywarsLosses == "0") {
              var skywarsWlr2 = skywarsWins;
            } else {
              var skywarsWlr3 = (skywarsWins / skywarsLosses).toFixed(2);
            }
            if (skywarsKills == "0") {
              var skywarsKdr1 = "0";
            } else if (skywarsDeaths == "0") {
              var skywarsKdr2 = skywarsKills;
            } else {
              var skywarsKdr3 = (skywarsKills / skywarsDeaths).toFixed(2);
            }

            var skywarsWlr = skywarsWlr1 || skywarsWlr2 || skywarsWlr3;
            var skywarsKdr = skywarsKdr1 || skywarsKdr2 || skywarsKdr3;

            // this.send(`/gc [${skywarsLevel}✫] ${player} | Kills: ${addCommas(skywarsKills)} KDR: ${skywarsKdr} | Wins: ${skywarsWins} WLR: ${skywarsWlr} | in the last 24 hours`)
            this.send(`/gc ${player} | Kills: ${addCommas(skywarsKills)} KDR: ${skywarsKdr} | Wins: ${skywarsWins} WLR: ${skywarsWlr} | in the last 24 hours`)
          } else if (["duels", "duel", "d"].includes(mode.toLowerCase())) {
            const duelsData = response.data.player.stats.Duels;
            const oldDuelsData = response24H.data.Duels;

            var duelsWins =
              duelsData.wins === undefined
                ? 0
                : duelsData.wins - oldDuelsData.overall.wins;
            var duelsLosses =
              duelsData.losses === undefined
                ? 0
                : duelsData.losses - oldDuelsData.overall.losses;
            var duelsKills =
              duelsData.kills === undefined
                ? 0
                : duelsData.kills - oldDuelsData.overall.kills;
            var duelsDeaths =
              duelsData.deaths === undefined
                ? 0
                : duelsData.deaths - oldDuelsData.overall.deaths;

            if (duelsWins == "0") {
              var duelsWlr1 = "0";
            } else if (duelsLosses == "0") {
              var duelsWlr2 = duelsWins;
            } else {
              var duelsWlr3 = (duelsWins / duelsLosses).toFixed(2);
            }
            if (duelsKills == "0") {
              var duelsKdr1 = "0";
            } else if (duelsDeaths == "0") {
              var duelsKdr2 = duelsKills;
            } else {
              var duelsKdr3 = (duelsKills / duelsDeaths).toFixed(2);
            }

            var duelsWlr = duelsWlr1 || duelsWlr2 || duelsWlr3;
            var duelsKdr = duelsKdr1 || duelsKdr2 || duelsKdr3;
            this.send(`/gc ${player} | Kills: ${addCommas(duelsKills)} KDR: ${duelsKdr} | Wins: ${addCommas(duelsWins)} WLR: ${duelsWlr} | in the last 24 hours`)
          }
        })
      })
    } catch (error) {
      if (error.response?.data?.error == "Player not in database") {
        this.send(
          `/gc ${player == username ? "You are" : `${player} is`
          } not in the database. ${player == username ? "You are" : `${player} is`
          } being added to the database..`
        );

        this.send(`/gc ${register(uuid,player)}`)
      }
    }
  }
}

module.exports = DailyStatsCommand;