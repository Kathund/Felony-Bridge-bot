const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const axios = require("axios");

class EightBallCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "8ball";
    this.aliases = ["8b"];
    this.description = "Ask an 8ball a question.";
    this.options = ["question"];
    this.optionsDescription = ["Any kind of question"];
  }


  async onCommand(username, message) {
    let playerIGN = username
    try {
      this.send(`/gc ${(await axios.get(`https://8ball.delegator.com/magic/JSON/${message.replace('!8ball ', '').replaceAll(' ', '%20').replaceAll('/', '')}`)).data.magic.answer}`);
    } catch (error) {
      await logError(playerIGN, error);
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = EightBallCommand;
