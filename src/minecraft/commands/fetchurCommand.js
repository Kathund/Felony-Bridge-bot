const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { getFetchur } = require("../../../API/functions/getFetchur.js");
const { logError } = require("../../contracts/helperFunctions.js");


class FetchurCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "fetchur";
    this.aliases = [];
    this.description = "Information about an item for Fetchur.";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const fetchur = getFetchur();
      const args = this.getArgs(message);
      let hidden = false;
      if (args[0] == "hidden") hidden = true;

      this.send(
        `${hidden ? "/oc" : "/gc"} Fetchur Requests » ${fetchur.text} | Description: ${fetchur.description}`
      );
    } catch (error) {
      await logError(error, username);
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = FetchurCommand;
