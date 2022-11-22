const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const axios = require("axios");

class DenickerCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "winstreak";
    this.aliases = ["ws"];
    this.description = "Estimated winstreaks of the specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const arg = this.getArgs(message);
      if (arg[0]) username = arg[0];
      const [player, response] = await Promise.all([
        hypixel.getPlayer(username),
        axios.get(
          `${config.api.antiSniperAPI}/winstreak?key=${config.api.antiSniperKey}&name=${username}`
        ),
      ]);
      this.send(
        `/gc [${player.stats.bedwars.level}✫] ${player.nickname}: Accurrate » ${response.data.player.accurate ? "Yes" : "No"
        } | Overall » ${response.data.player.data.overall_winstreak} | Solo » ${response.data.player.data.eight_one_winstreak
        } | Doubles » ${response.data.player.data.eight_two_winstreak} | Trios » ${response.data.player.data.four_three_winstreak
        } | Fours » ${response.data.player.data.four_four_winstreak} | 4v4  » ${response.data.player.data.two_four_winstreak
        }`
      );
      fetch(`https://api.pixelic.de/v1/player/register?key=${config.api.pixelKey}&uuid=${player.uuid}`, {
        method: "POST",
      }).then((res) => {
        if (res.status == 201) {
          console.log(`/gc Successfully registered ${player} in the database!`);
        } else if (res.status == 400) {
          console.log(`/gc ${player} is already registered in the database!`);
        } else {
          console.log(`/gc An error occured while registering ${player} in the database! Please try again in few seconds.`);
        }
      });
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = DenickerCommand;
