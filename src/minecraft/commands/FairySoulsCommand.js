const { getLatestProfile } = require("../../../API/functions/getLatestProfile.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");

class FairySoulsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "fairysouls";
    this.aliases = ["fs"];
    this.description = "Fairy Souls of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message);
      if (msg[0]) username = msg[0];
      let hidden = false;
      if (msg[1] == "hidden") hidden = true;

      const data = await getLatestProfile(username);
      username = data.profileData?.game_mode ? `♲ ${username}` : username;
      this.send(
        `${hidden ? "/oc" : "/gc"} ${username}'s Fairy Souls: ${data.profile.fairy_souls_collected
        }/238 | Progress: ${(Math.round((data.profile.fairy_souls_collected / 238) * 100) / 100) *
        100
        }%`
      );
    } catch (error) {
      await logError(username, error);
      console.log(error);
      this.send(
        "/gc There is no player with the given UUID or name or the player has no Skyblock profiles"
      );
    }
  }
}

module.exports = FairySoulsCommand;
