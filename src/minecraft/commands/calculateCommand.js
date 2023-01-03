const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");

class CalculateCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "calculate";
    this.aliases = ["calc", "math"];
    this.description = "Calculate.";
    this.options = ["calculation"];
    this.optionsDescription = ["Any kind of math equation"];
  }

  async onCommand(username, message) {
    let playerIGN = username
    try {
      const str = this.getArgs(message)
        .join(" ")
        .replace(/[^-()\d/*+.]/g, "");
      this.send(`/gc ${!isNaN(eval(str)) ? `${eval(str)}` : ""}`);
    } catch (error) {
      await logError(playerIGN, error);
      console.log(error);
      this.send("/gc Invalid input!");
    }
  }
}

module.exports = CalculateCommand;
