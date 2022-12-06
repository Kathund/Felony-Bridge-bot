const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addNotation } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

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
        var data = hypixel.getKeyInfo()
        this.send(`/oc ${await getUUID(data.owner)} ${await addNotation("oneLetters", data.totalRequests)}`)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = APICommand;
