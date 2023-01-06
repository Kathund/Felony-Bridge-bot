/*eslint-disable */
const MinecraftManager = require("./minecraft/MinecraftManager.js");
const DiscordManager = require("./discord/DiscordManager.js");
/*eslint-enable */

class Application {
  async register() {
    this.discord = new DiscordManager(this);
    this.minecraft = new MinecraftManager(this);

    this.discord.setBridge(this.minecraft);
    this.minecraft.setBridge(this.discord);
  }

  async connect() {
    this.discord.connect();
    this.minecraft.connect();
  }
}

module.exports = new Application();
