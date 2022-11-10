const helperFunctions = require("./helperFunctions.js");
const config = require("../../config.json");

class minecraftCommand {
  constructor(minecraft) {
    this.minecraft = minecraft;
  }

  getArgs(message) {
    const args = message.split(" ");

    args.shift();
    return args;
  }

  send(message) {
    if (this.minecraft.bot.player !== undefined) {
      if (config.minecraft.messageRepeatBypass) {
        const string = helperFunctions.generateID(
          config.minecraft.messageRepeatBypassLength
        );
        if (args[1] == "promote" || args[1] == "demote" || args[1] == "setrank") return this.minecraft.bot.chat(message)
        else {
          this.minecraft.bot.chat(message + " - " + string);
        }
      } else {
        this.minecraft.bot.chat(message);
      }
    }
  }

  onCommand(player, message) {
    throw new Error("Command onCommand method is not implemented yet!");
  }
}

module.exports = minecraftCommand;
