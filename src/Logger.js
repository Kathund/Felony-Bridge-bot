async function discordMessage(message) {
  return console.log(`[${await getCurrentTime()}] Discord > ${message}`);
}

async function minecraftMessage(message) {
  return console.log(`[${await getCurrentTime()}] Minecraft > ${message}`);
}

async function warnMessage(message) {
  return console.log(`[${await getCurrentTime()}] Warning > ${message}`)
}

async function errorMessage(message) {
  return console.log(`[${await getCurrentTime()}] Error > ${message}`)
}

async function broadcastMessage(message, location) {
  return console.log(`[${await getCurrentTime()}] ${location} Broadcast > ${message}`);
}

async function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

module.exports = { discordMessage, minecraftMessage, warnMessage, errorMessage, broadcastMessage, getCurrentTime };
