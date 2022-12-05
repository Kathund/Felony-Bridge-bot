const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addNotation } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

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
      let hidden = false;
      if (msg[0]) username = msg[0];
      if (msg[1] == ["hidden", "hide", "h"]) hidden = true;
      const player = await hypixel.getPlayer(username);
      const guild = await hypixel.getGuild("player", username);
      const friend = await hypixel.getFriends(username);
      var friends = friend.length + 1;
      var onlineStatus = "Offline";
      if (player.isOnline == true) onlineStatus = "Online";
      this.send(
        `${hidden ? "/oc" : "/gc"} [${player.rank}] ${player.nickname}: Level: ${player.level
        } | ${onlineStatus} | Karma ${addNotation(
          "oneLetters",
          player.karma
        )} | Achievement Points ${addNotation(
          "oneLetters",
          player.achievementPoints
        )} | Guild: ${guild.name} | Friends: ${friends} | Ranks Gifted: ${player.giftsSent
        }`
      );
      fetch(
        `${config.api.pixelicAPI}/player/register?key=${config.api.pixelicKey}&uuid=${player.uuid}`,
        {
          method: "POST",
        }
      ).then((res) => {
        if (res.status == 201) {
          console.log(
            `Successfully registered ${player.nickname} in the database!`
          );
        } else if (res.status == 400) {
          console.log(
            `${player.nickname} is already registered in the database!`
          );
        } else {
          console.log(
            `An error occured while registering ${player.nickanem} in the database! Please try again in few seconds.`
          );
        }
      });
    } catch (error) {
      this.send(
        "There is no player with the given UUID or name or player has never joined Hypixel."
      );
    }
  }
}

module.exports = PlayerCommand;
