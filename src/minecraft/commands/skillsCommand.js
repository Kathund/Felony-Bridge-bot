const { getLatestProfile } = require("../../../API/functions/getLatestProfile.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const getSkills = require("../../../API/stats/skills.js");

class SkillsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "skills";
    this.aliases = ["skill"];
    this.description = "Skills and Skill Average of specified user.";
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
      const profile = getSkills(data.profile);
      this.send(
        `${hidden ? "/oc" : "/gc"} Skill Average » ${Math.round(
          ((profile.farming.level +
            profile.mining.level +
            profile.combat.level +
            profile.foraging.level +
            profile.fishing.level +
            profile.enchanting.level +
            profile.alchemy.level +
            profile.taming.level +
            profile.carpentry.level) /
            9) *
          100
        ) / 100
        || 0} | Farming - ${Math.round(profile.farming.levelWithProgress * 100) / 100
        || 0} | Mining - ${Math.round(profile.mining.levelWithProgress * 100) / 100
        || 0} | Combat - ${Math.round(profile.combat.levelWithProgress * 100) / 100
        || 0} | Enchanting - ${Math.round(profile.enchanting.levelWithProgress * 100) / 100
        || 0} | Fishing - ${Math.round(profile.fishing.levelWithProgress * 100) / 100
        || 0} | Foraging - ${Math.round(profile.foraging.levelWithProgress * 100) / 100
        || 0} | Alchemy - ${Math.round(profile.alchemy.levelWithProgress * 100) / 100
        || 0} | Taming - ${Math.round(profile.taming.levelWithProgress * 100) / 100
        || 0} | Carpentry - ${Math.round(profile.carpentry.levelWithProgress * 100) / 100
        || 0}`
      );
    } catch (error) {
      await logError(playerIGN, error);
      console.log(error);
      this.send(
        "/gc There is no player with the given UUID or name or the player has no Skyblock profiles"
      );
    }
  }
}

module.exports = SkillsCommand;
