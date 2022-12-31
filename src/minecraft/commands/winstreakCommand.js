const { getStar, register, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

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
      let hidden = false;
      if (arg[0]) username = arg[0];
      if (arg[1] == "hidden") hidden = true;
      const player = await hypixel.getPlayer(username)
      fetch(`${config.api.antiSniperAPI}/winstreak?key=${config.api.antiSniperKey}&name=${username}`).then((res) => res.json()).then(async (data) => {
        this.send(`${hidden ? "/oc" : "/gc"} [${player.stats.bedwars.level}${getStar(player.stats.bedwars.level)}] ${player.nickname
          } | Accurrate » ${data.player.accurate ? "Yes" : "No"} | Overall » ${data.player.data.overall_winstreak
          } | Solo » ${data.player.data.eight_one_winstreak} | Doubles » ${data.player.data.eight_two_winstreak
          } | Trios » ${data.player.data.four_three_winstreak} | Fours » ${data.player.data.four_four_winstreak
          } | 4v4  » ${data.player.data.two_four_winstreak}`
        );
        await register(await getUUID(username), username)
      });
    } catch (error) {
      await logError(error, username);
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = DenickerCommand;
