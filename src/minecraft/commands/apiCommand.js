const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addNotation } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

class APICommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "api";
    this.aliases = [];
    this.description = "api command go brrr";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      var key = hypixel.getKeyInfo()
      this.send(`/gc a `)
      console.log(key)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = APICommand;
