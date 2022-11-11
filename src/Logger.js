const clc = require("cli-color");


async function discordMessage(message) {
  return console.log(clc.bgMagenta.black(`[${await getCurrentTime()}] Discord >`) + ' ' + clc.magenta(message));
}

async function minecraftMessage(message) {
  return console.log(clc.bgGreenBright.black(`[${await getCurrentTime()}] Minecraft >`) + ' ' + clc.greenBright(message));
}

async function warnMessage(message) {
  return console.log(clc.bgYellow.black(`[${await getCurrentTime()}] Warning >`) + ' ' + clc.yellow(message));
}

async function errorMessage(message) {
  return console.log(clc.bgRedBright.black(`[${await getCurrentTime()}] Error >`) + ' ' + clc.redBright(message));
}

async function broadcastMessage(message, location) {
  return console.log(clc.inverse(`[${await getCurrentTime()}] ${location} Broadcast >`) + ' ' + message);
}

async function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

module.exports = { discordMessage, minecraftMessage, warnMessage, errorMessage, broadcastMessage, getCurrentTime };
