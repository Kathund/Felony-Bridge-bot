const { addNotation, register, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

class PlayerCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "player";
    this.aliases = [];
    this.description = "PLayer info of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message);
      if (msg[0]) username = msg[0];
      let hidden = false;
      if (msg[1] == "hidden") hidden = true;

      const player = await hypixel.getPlayer(username);
      var guild = await hypixel.getGuild("player", username);
      if (guild == null) guild = { name: "None" };
      const friend = await hypixel.getFriends(username);
      var onlineStatus = "Offline";
      if (player.isOnline == true) onlineStatus = "Online";
      this.send(
        `${hidden ? "/oc" : "/gc"} [${player.rank}] ${player.nickname}: Level: ${player.level
        } | ${onlineStatus
        } | Karma ${addNotation("oneLetters", player.karma)
        } | Achievement Points ${addNotation("oneLetters", player.achievementPoints)
        } | Guild: ${guild.name
        } | Friends: ${friend.length
        }`
      );
      await register(await getUUID(username), username)
    } catch (error) {
      await logError(username, error);
      console.log(error)
      this.send(
        "There is no player with the given UUID or name or player has never joined Hypixel."
      );
    }
  }
}

module.exports = PlayerCommand;
