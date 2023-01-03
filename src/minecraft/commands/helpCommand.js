const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");

class HelpCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "help";
    this.aliases = ["info"];
    this.description = "Shows help menu";
    this.options = [];
    this.optionsDescription = [];
  }

  async onCommand(username, message) {
    let playerIGN = username
    try {
      // TODO update ss
      this.send(`/gc https://imgur.com/4LoDwPs.png`);
    } catch (error) {
      await logError(playerIGN, error);
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = HelpCommand;
