const fs = require("fs-promise");
const { set } = require("lodash");
const mkdirp = require("mkdirp");
const getDirName = require("path").dirname;
const nbt = require("prismarine-nbt");
const util = require("util");
const parseNbt = util.promisify(nbt.parse);
const moment = require("moment");
const config = require("../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

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
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()~",
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


function getStar(level) {
  let star = "✫"
  if (level >= 0) star = "✫";
  if (level >= 1100) star = "✪";
  if (level >= 2100) star = "⚝";
  return star;
};

async function register(uuid, username) {
  fetch(
    `${config.api.pixelicAPI}/player/register/${uuid}?key=${config.api.pixelicKey}`,
    {
      method: "POST",
    }
  ).then((res) => res.json()).then((res) => {
    const errorMessage = `An error occured while registering ${username} in the database! Please try again in few seconds.`
    try {
      if (res.success) {
        console.log(`Successfully registered ${username} in the database!`)
        return (`Successfully registered ${username} in the database!`)
      } else if (res.error) {
        if (res.error == "Player already added") {
          console.log(`${username} is already registered in the database!`)
          return (`${username} is already registered in the database!`)
        } else if (res.error == "Player's last login was more than 30d ago") {
          console.log(`${username}'s last login was more than 30d ago!`)
          return (`${username}'s last login was more than 30d ago!`)
        } else {
          return errorMessage
        }
      } else {
        return errorMessage
      }
    } catch {
      return errorMessage
    }
  });
}

async function logError(error, username) {
  fetch(config.discord.loggingWebhook, {
    body: JSON.stringify({
      content: `**Caused By** - ${username}\n${error}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
}



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
  nth,
  parseTimestamp,
  getStar,
  register,
  logError
};