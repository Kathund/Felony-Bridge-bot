const minecraftCommand = require("../../contracts/minecraftCommand.js");

class ExampleCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "example";
    this.aliases = [];
    this.description = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
        console.log(`the username var represents the username of the person running the command - ${username}`)
        console.log(`the message var represents the full message from the user - ${message}`)
        console.log(`use this.send to send a message as the bot`)
        this.send(`/gc Check the console`)
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = ExampleCommand;
