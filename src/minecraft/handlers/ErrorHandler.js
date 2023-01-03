const { logError } = require("../../contracts/helperFunctions.js");
const eventHandler = require("../../contracts/EventHandler.js");
const config = require("../../../config.json")
const logger = require("../.././logger.js");

class StateHandler extends eventHandler {
  constructor(minecraft) {
    super();

    this.minecraft = minecraft;
  }

  registerEvents(bot) {
    this.bot = bot;

    this.bot.on("error", (...args) => this.onError(...args));
  }

  async onError(error) {
    if (this.isConnectionResetError(error)) return;

    if (this.isConnectionRefusedError(error)) {
      await logError(config.minecraft.bot.name, "Connection refused while attempting to login via the Minecraft client")
      return logger.errorMessage("Connection refused while attempting to login via the Minecraft client");
    }

    logger.warnMessage(error);
  }

  isConnectionResetError(error) {
    return error.code && error.code == "ECONNRESET";
  }

  isConnectionRefusedError(error) {
    return error.code && error.code == "ECONNREFUSED";
  }
}

module.exports = StateHandler;
