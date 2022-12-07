const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addNotation } = require("../../contracts/helperFunctions.js");
const { getUsername } = require("../../contracts/API/MojangAPI.js");
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
      var key = await hypixel.getKeyInfo()
      this.send(`/gc Owned by ${await getUsername(key.owner)} - ${addNotation('oneLetters', key.totalRequests)} requests`)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = APICommand;
