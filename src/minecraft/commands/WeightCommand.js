const { getLatestProfile } = require("../../../API/functions/getLatestProfile.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const getWeight = require("../../../API/stats/weight.js");

class StatsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "weight";
    this.aliases = ["w"];
    this.description = "Skyblock Weight of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    let playerIGN = username
    try {
      const arg = this.getArgs(message);
      if (arg[0]) username = arg[0];
      let hidden = false;
      if (arg[1] == "hidden") hidden = true;

      const data = await getLatestProfile(username);
      username = data.profileData?.game_mode ? `♲ ${username}` : username;
      const profile = await getWeight(data.profile, data.uuid);
      const senitherW = `Senither Weight » ${Math.round(profile.weight.senither.total * 100) / 100
        } | Skills: ${Math.round(
          (profile.weight.senither.skills.alchemy.total +
            profile.weight.senither.skills.combat.total +
            profile.weight.senither.skills.enchanting.total +
            profile.weight.senither.skills.farming.total +
            profile.weight.senither.skills.fishing.total +
            profile.weight.senither.skills.foraging.total +
            profile.weight.senither.skills.mining.total +
            profile.weight.senither.skills.taming.total) *
          100
        ) / 100
        } | Slayer: ${Math.round(profile.weight.senither.slayer.total * 100) / 100
        } | Dungeons: ${Math.round(profile.weight.senither.dungeons.total * 100) / 100
        }`;
      this.send(`${hidden ? "/oc" : "/gc"} ${username}'s ${senitherW}`);
    } catch (error) {
      await logError(playerIGN, error);
      console.log(error);
      this.send(
        "/gc There is no player with the given UUID or name or the player has no Skyblock profiles"
      );
    }
  }
}

module.exports = StatsCommand;
