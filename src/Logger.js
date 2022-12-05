var cli = require("cli-color");

async function discordMessage(message) {
  return console.log(cli.bgMagenta.black(`[${await getCurrentTime()}] Discord >`) + ' ' + cli.magenta(message));
}

async function minecraftMessage(message) {
  return console.log(cli.bgGreenBright.black(`[${await getCurrentTime()}] Minecraft >`) + ' ' + cli.greenBright(message));
}

async function warnMessage(message) {
  return console.log(cli.bgGreenBright.black(`[${await getCurrentTime()}] Warning >`) + ' ' + cli.yellow(message));
}

async function errorMessage(message) {
  return console.log(cli.bgRedBright.black(`[${await getCurrentTime()}] Error >`) + ' ' + cli.redBright(message));
}

async function broadcastMessage(message, location) {
  return console.log(cli.inverse(`[${await getCurrentTime()}] ${location} Broadcast >`) + ' ' + (message));
}

async function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

module.exports = { discordMessage, minecraftMessage, warnMessage, errorMessage, broadcastMessage, getCurrentTime };
