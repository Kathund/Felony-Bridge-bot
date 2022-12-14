const { logError } = require("../../contracts/helperFunctions.js");
const eventHandler = require("../../contracts/EventHandler.js");
const config = require("../../../config.json")
const logger = require("../../logger.js");

class StateHandler extends eventHandler {
  constructor(minecraft) {
    super();

    this.minecraft = minecraft;
    this.loginAttempts = 0;
    this.exactDelay = 0;
  }

  registerEvents(bot) {
    this.bot = bot;

    this.bot.on("login", (...args) => this.onLogin(...args));
    this.bot.on("end", (...args) => this.onEnd(...args));
    this.bot.on("kicked", (...args) => this.onKicked(...args));
  }

  async onLogin() {
    logger.minecraftMessage("Client ready, logged in as " + this.bot.username);

    this.loginAttempts = 0;
    this.exactDelay = 0;
    var error = `Client ready, logged in as ${config.minecraft.bot.name}`
    await logError(config.minecraft.bot.name, error, this.name, error);
  }

  async onEnd() {
    const loginDelay =
      this.exactDelay > 60000 ? 60000 : (this.loginAttempts + 1) * 5000;

    logger.warnMessage(
      `Minecraft bot has disconnected! Attempting reconnect in ${loginDelay / 1000
      } seconds`
    );
    await logError(config.minecraft.bot.name, `Minecraft bot has disconnected! Attempting to reconnect in ${loginDelay / 1000} seconds`, this.name, `Minecraft bot has disconnected! Attempting to reconnect in ${loginDelay / 1000} seconds`);
    setTimeout(() => this.minecraft.connect(), loginDelay);
  }

  async onKicked(reason) {
    logger.warnMessage(
      `Minecraft bot has been kicked from the server for "${reason}"`
    );
    await logError(config.minecraft.bot.name, `Minecraft bot has been kicked from the server for **"${reason}"**`, this.name, `Minecraft bot has been kicked from the server for **"${reason}"**`);

    this.loginAttempts++;
  }
}

module.exports = StateHandler;
