const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");

class ExampleCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "example";
    this.aliases = [];
    this.description = "Test example command";
    this.options = [];
  }

  async onCommand(username, message) {
    var playerIGN = username
    try {
      console.log(`the username var represents the username of the person running the command - ${username}`)
      console.log(`the message var represents the full message from the user - ${message}`)
      console.log(`use this.send to send a message as the bot`)
      this.send(`/gc Check the console`)
    } catch (error) {
      await logError(playerIGN, error, this.name, message);
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = ExampleCommand;
