const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")

class KeyCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "key";
    this.aliases = [];
    this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const keyInfo = await hypixel.getKeyInfo(config.api.hypixelAPIkey)
      console.log(keyInfo)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = KeyCommand;
