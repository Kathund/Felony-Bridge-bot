const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/api/MojangAPI.js");
const { addNotation } = require("../../contracts/helperFunctions.js");

class ExampleCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "api";
    this.aliases = [];
    this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
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

module.exports = ExampleCommand;
