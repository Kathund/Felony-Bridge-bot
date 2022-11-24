const fs = require("fs-promise");
const { set } = require("lodash");
const mkdirp = require("mkdirp");
const getDirName = require("path").dirname;
const nbt = require("prismarine-nbt");
const util = require("util");
const parseNbt = util.promisify(nbt.parse);
const axios = require("axios");
const config = require("../../config.json");
const moment = require("moment");

function replaceAllRanks(input) {
  input = input.replaceAll("[OWNER] ", "");
  input = input.replaceAll("[ADMIN] ", "");
  input = input.replaceAll("[MCP] ", "");
  input = input.replaceAll("[GM] ", "");
  input = input.replaceAll("[PIG+++] ", "");
  input = input.replaceAll("[YOUTUBE] ", "");
  input = input.replaceAll("[MVP++] ", "");
  input = input.replaceAll("[MVP+] ", "");
  input = input.replaceAll("[MVP] ", "");
  input = input.replaceAll("[VIP+] ", "");
  input = input.replaceAll("[VIP] ", "");
  return input;
}

function addNotation(type, value) {
  let returnVal = value;
  let notList = [];
  if (type === "shortScale") {
    notList = [
      " Thousand",
      " Million",
      " Billion",
      " Trillion",
      " Quadrillion",
      " Quintillion",
    ];
  }

  if (type === "oneLetters") {
    notList = [" K", " M", " B", " T"];
  }

  let checkNum = 1000;
  if (type !== "none" && type !== "commas") {
    let notValue = notList[notList.length - 1];
    for (let u = notList.length; u >= 1; u--) {
      notValue = notList.shift();
      for (let o = 3; o >= 1; o--) {
        if (value >= checkNum) {
          returnVal = value / (checkNum / 100);
          returnVal = Math.floor(returnVal);
          returnVal = (returnVal / Math.pow(10, o)) * 10;
          returnVal = +returnVal.toFixed(o - 1) + notValue;
        }
        checkNum *= 10;
      }
    }
  } else {
    returnVal = numberWithCommas(value.toFixed(0));
  }

  return returnVal;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function generateID(length) {
  let result = "";
  const characters = "abcde0123456789",
    charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRarityColor(rarity) {
  if (rarity.toLowerCase() == "mythic") return "d";
  if (rarity.toLowerCase() == "legendary") return "6";
  if (rarity.toLowerCase() == "epic") return "5";
  if (rarity.toLowerCase() == "rare") return "9";
  if (rarity.toLowerCase() == "uncommon") return "a";
  if (rarity.toLowerCase() == "common") return "f";
  else return "f";
}

function addCommas(num) {
  try {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    return 0;
  }
}

function toFixed(num, fixed) {
  const response = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(response)[0];
}

function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp) / 1000;
  secondsPast = Math.abs(secondsPast);

  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "m";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h";
  }
  if (secondsPast > 86400) {
    const d = toFixed(parseInt(secondsPast / 86400), 0);
    secondsPast -= 3600 * 24 * d;
    const h = toFixed(parseInt(secondsPast / 3600), 0);
    secondsPast -= 3600 * h;
    const m = toFixed(parseInt(secondsPast / 60), 0);
    secondsPast -= 60 * m;
    const s = toFixed(parseInt(secondsPast), 0);
    return d + "d " + h + "h " + m + "m " + s + "s";
  }
}

function writeAt(filePath, jsonPath, value) {
  mkdirp.sync(getDirName(filePath));

  return fs
    .readJson(filePath)
    .then(function (json) {
      set(json, jsonPath, value);
      return fs.writeJson(filePath, json);
    })
    .catch(function (error) {
      const json = {};
      set(json, jsonPath, value);
      return fs.writeJson(filePath, json);
    });
}

function capitalize(str) {
  const words = str.replace(/_/g, " ").toLowerCase().split(" ");

  const upperCased = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.substr(1);
  });

  return upperCased.join(" ");
}

async function decodeData(buffer) {
  const parsedNbt = await parseNbt(buffer);
  return nbt.simplify(parsedNbt);
}

// Bedwars Level Calculator
const EASY_LEVELS = 4;
const EASY_LEVELS_XP = 7000;
const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
const LEVELS_PER_PRESTIGE = 100;
const HIGHEST_PRESTIGE = 10;

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

function getSkywarsLevel(exp) {
  var xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
  let exactLevel = 0;
  if (exp >= 15000) {
    exactLevel = (exp - 15000) / 10000 + 12;
  } else {
    for (let i = 0; i < xps.length; i++) {
      if (exp < xps[i]) {
        exactLevel = i + (exp - xps[i - 1]) / (xps[i] - xps[i - 1]);
        break;
      }
    }
  }

  return exactLevel;
}

async function getStats(player, uuid, mode, time, username) {
  const [response, response24H] = await Promise.all([
    axios.get(
      `${config.api.hypixelAPI}/player?uuid=${uuid}&key=${config.api.hypixelAPIkey}`
    ),
    axios.get(`${config.api.pixelAPI}/${time}?key=${config.api.pixelKey}&uuid=${uuid}`),
  ]);

  if (!mode || mode.includes("/")) {
    // return `/gc ${player} has gained `
    // return `/gc ${player == username ? "You have" : `${player} has`} gained ${response.data.player.karma - response24H.data.General.karma} karma and gained ${(getLevel(response.data.player) - response24H.data.General.levelRaw).toFixed(3)} levels in the last ${time}`;
    return `/gc This is diabled as I am re making all this code!`
  } else if (["bw", "bedwars", "bedwar", "bws"].includes(mode.toLowerCase())) {
    const bedwarsData = response.data.player.stats.Bedwars;
    const oldBedwarsData = response24H.data.Bedwars;

    const bedwarsExperience = bedwarsData.Experience - oldBedwarsData.EXP;
    const bedwarsLevel = getBedwarsLevel(bedwarsExperience);

    var bedwarsWins = bedwarsData.wins_bedwars === undefined ? 0 : bedwarsData.wins_bedwars - oldBedwarsData.overall.wins
    var bedwarsLosses = bedwarsData.losses_bedwars === undefined ? 0 : bedwarsData.losses_bedwars - oldBedwarsData.overall.losses
    var bedwarsFinalKills = bedwarsData.final_kills_bedwars === undefined ? 0 : bedwarsData.final_kills_bedwars - oldBedwarsData.overall.finalKills
    var bedwarsFinalDeaths = bedwarsData.final_deaths_bedwars === undefined ? 0 : bedwarsData.final_deaths_bedwars - oldBedwarsData.overall.finalDeaths
    var bedwarsBedsBroken = bedwarsData.beds_broken_bedwars === undefined ? 0 : bedwarsData.beds_broken_bedwars - oldBedwarsData.overall.bedsBroken
    var bedwarsBedsLost = bedwarsData.beds_lost_bedwars === undefined ? 0 : bedwarsData.beds_lost_bedwars - oldBedwarsData.overall.bedsLost

    if (bedwarsWins == '0') {
      var bedwarsWlr1 = '0'
    }
    else if (bedwarsLosses == '0') {
      var bedwarsWlr2 = bedwarsWins
    }
    else {
      var bedwarsWlr3 = (bedwarsWins / bedwarsLosses).toFixed(2)
    }
    if (bedwarsFinalKills == '0') {
      var bedwarsFkdr1 = '0'
    }
    else if (bedwarsFinalDeaths == '0') {
      var bedwarsFkdr2 = bedwarsFinalKills
    }
    else {
      var bedwarsFkdr3 = (bedwarsFinalKills / bedwarsFinalDeaths).toFixed(2)
    }
    if (bedwarsBedsBroken == '0') {
      var bedwarsBblr1 = '0'
    }
    else if (bedwarsBedsLost == '0') {
      var bedwarsBblr2 = bedwarsBedsBroken
    }
    else {
      var bedwarsBblr3 = (bedwarsBedsBroken / bedwarsBedsLost).toFixed(2)
    }

    var bedwarsWlr = bedwarsWlr1 || bedwarsWlr2 || bedwarsWlr3
    var bedwarsFkdr = bedwarsFkdr1 || bedwarsFkdr2 || bedwarsFkdr3
    var bedwarsBblr = bedwarsBblr1 || bedwarsBblr2 || bedwarsBblr3

    return `/gc [${bedwarsLevel}✫] ${player} FK: ${addCommas(bedwarsFinalKills)} FKDR: ${bedwarsFkdr} | Wins: ${bedwarsWins} WLR: ${bedwarsWlr} | BB: ${bedwarsBedsBroken} BLR: ${bedwarsBblr1}`;

  } else if (["sw", "skywars", "skywar", "sws"].includes(mode.toLowerCase())) {
    const skywarsData = response.data.player.stats.SkyWars;
    const oldSkywarsData = response24H.data.Skywars;

    const skywarsExperience = skywarsData.skywars_experience - oldSkywarsData.EXP;
    const skywarsLevel = getSkywarsLevel(skywarsExperience) - 1;

    var skywarsWins = skywarsData.wins === undefined ? 0 : skywarsData.wins - oldSkywarsData.overall.wins
    var skywarsLosses = skywarsData.losses === undefined ? 0 : skywarsData.losses - oldSkywarsData.overall.losses
    var skywarsKills = skywarsData.kills === undefined ? 0 : skywarsData.kills - oldSkywarsData.overall.kills
    var skywarsDeaths = skywarsData.deaths === undefined ? 0 : skywarsData.deaths - oldSkywarsData.overall.deaths

    if (skywarsWins == '0') {
      var skywarsWlr1 = '0'
    }
    else if (skywarsLosses == '0') {
      var skywarsWlr2 = skywarsWins
    }
    else {
      var skywarsWlr3 = (skywarsWins / skywarsLosses).toFixed(2)
    }
    if (skywarsKills == '0') {
      var skywarsKdr1 = '0'
    }
    else if (skywarsDeaths == '0') {
      var skywarsKdr2 = skywarsKills
    }
    else {
      var skywarsKdr3 = (skywarsKills / skywarsDeaths).toFixed(2)
    }

    var skywarsWlr = skywarsWlr1 || skywarsWlr2 || skywarsWlr3
    var skywarsKdr = skywarsKdr1 || skywarsKdr2 || skywarsKdr3

    return `/gc [${skywarsLevel}✫] ${player} | Kills: ${addCommas(skywarsKills)} KDR: ${skywarsKdr} | Wins: ${skywarsWins} WLR: ${skywarsWlr}`;
  } else if (["duels", "duel", "d"].includes(mode.toLowerCase())) {
    const duelsData = response.data.player.stats.Duels;
    const oldDuelsData = response24H.data.Duels;

    var duelsWins = duelsData.wins === undefined ? 0 : duelsData.wins - oldDuelsData.overall.wins
    var duelsLosses = duelsData.losses === undefined ? 0 : duelsData.losses - oldDuelsData.overall.losses
    var duelsKills = duelsData.kills === undefined ? 0 : duelsData.kills - oldDuelsData.overall.kills
    var duelsDeaths = duelsData.deaths === undefined ? 0 : duelsData.deaths - oldDuelsData.overall.deaths

    if (duelsWins == '0') {
      var duelsWlr1 = '0'
    }
    else if (duelsLosses == '0') {
      var duelsWlr2 = duelsWins
    }
    else {
      var duelsWlr3 = (duelsWins / duelsLosses).toFixed(2)
    }
    if (duelsKills == '0') {
      var duelsKdr1 = '0'
    }
    else if (duelsDeaths == '0') {
      var duelsKdr2 = duelsKills
    }
    else {
      var duelsKdr3 = (duelsKills / duelsDeaths).toFixed(2)
    }

    var duelsWlr = duelsWlr1 || duelsWlr2 || duelsWlr3
    var duelsKdr = duelsKdr1 || duelsKdr2 || duelsKdr3
    return `/gc ${player} | Kills: ${addCommas(duelsKills)} KDR: ${duelsKdr} | Wins: ${addCommas(duelsWins)} WLR: ${duelsWlr}`;
  }
}

function nth(i) {
  return i + ["st", "nd", "rd"][((((i + 90) % 100) - 10) % 10) - 1] || `${i}th`;
}

const units = new Set(["y", "M", "w", "d", "h", "m", "s"]);

function parseDateMath(mathString, time) {
  const strippedMathString = mathString.replace(/\s/g, "");
  const dateTime = time;
  let i = 0;
  const { length } = strippedMathString;

  while (i < length) {
    const c = strippedMathString.charAt(i);
    i += 1;
    let type;
    let number;

    if (c === "/") {
      type = 0;
    } else if (c === "+") {
      type = 1;
    } else if (c === "-") {
      type = 2;
    } else {
      return;
    }

    if (Number.isNaN(Number.parseInt(strippedMathString.charAt(i), 10))) {
      number = 1;
    } else if (strippedMathString.length === 2) {
      number = strippedMathString.charAt(i);
    } else {
      const numberFrom = i;
      while (!Number.isNaN(Number.parseInt(strippedMathString.charAt(i), 10))) {
        i += 1;
        if (i > 10) {
          return;
        }
      }
      number = Number.parseInt(strippedMathString.slice(numberFrom, i), 10);
    }

    if (type === 0 && number !== 1) {
      return;
    }

    const unit = strippedMathString.charAt(i);
    i += 1;

    if (!units.has(unit)) {
      return;
    }
    if (type === 0) {
      dateTime.startOf(unit);
    } else if (type === 1) {
      dateTime.add(number, unit);
    } else if (type === 2) {
      dateTime.subtract(number, unit);
    }
  }

  return dateTime;
}

const parseTimestamp = function (text) {
  if (!text) return;

  if (typeof text !== "string") {
    if (moment.isMoment(text)) {
      return text;
    }
    if (moment.isDate(text)) {
      return moment(text);
    }
    return;
  }

  let time;
  let mathString = "";
  let index;
  let parseString;

  if (text.slice(0, 3) === "now") {
    time = moment.utc();
    mathString = text.slice(3);
  } else {
    index = text.indexOf("||");
    if (index === -1) {
      parseString = text;
      mathString = "";
    } else {
      parseString = text.slice(0, Math.max(0, index));
      mathString = text.slice(Math.max(0, index + 2));
    }

    time = moment(parseString, moment.ISO_8601);
  }

  if (mathString.length === 0) {
    return time.valueOf();
  }

  const dateMath = parseDateMath(mathString, time);
  return dateMath ? dateMath.valueOf() : undefined;
};

module.exports = {
  replaceAllRanks,
  addNotation,
  generateID,
  getRarityColor,
  addCommas,
  toFixed,
  timeSince,
  writeAt,
  capitalize,
  decodeData,
  numberWithCommas,
  getStats,
  nth,
  parseTimestamp,
};
