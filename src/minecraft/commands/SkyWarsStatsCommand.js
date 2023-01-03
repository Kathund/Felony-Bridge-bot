const { register, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

class SkywarsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "skywars";
    this.aliases = ["sw"];
    this.description = "Skywars stats of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    var playerIGN = username
    try {
      const msg = this.getArgs(message);
      if (msg[0]) username = msg[0];
      let hidden = false;
      if (msg[1] == "hidden") hidden = true;

      const player = await hypixel.getPlayer(username);

      this.send(`${hidden ? "/oc" : "/gc"} [${player.stats.skywars.level}✫] ${player.nickname
        } | Kills: ${player.stats.skywars.kills} KDR: ${player.stats.skywars.KDRatio
        } | Wins: ${player.stats.skywars.wins} WLR: ${player.stats.skywars.WLRatio
        } | WS: ${player.stats.skywars.winstreak}`
      );

      await register(await getUUID(username), username)
    } catch (error) {
      await logError(playerIGN, error);
      console.log(error)
      this.send(
        "There is no player with the given UUID or name or player has never joined Hypixel."
      );
    }
  }
}

module.exports = SkywarsCommand;
