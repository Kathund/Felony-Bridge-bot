const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

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
    try {
      const msg = this.getArgs(message);
      let hidden = false;
      if (msg[0] == ["hidden", "hide", "h"]) hidden = true;
      if (msg[0]) username = msg[0];
      const player = await hypixel.getPlayer(username);

      this.send(
        `${hidden ? "/oc" : "/gc"} [${player.stats.skywars.level}✫] ${player.nickname} Kills: ${player.stats.skywars.kills} KDR:${player.stats.skywars.KDRatio} | Wins: ${player.stats.skywars.wins} WLR:${player.stats.skywars.WLRatio}| WS:${player.stats.skywars.winstreak}`
      );
      fetch(
        `${config.api.pixelicAPI}/player/register?key=${config.api.pixelicKey}&uuid=${player.uuid}`,
        {
          method: "POST",
        }
      ).then((res) => {
        if (res.status == 201) {
          console.log(
            `/Successfully registered ${player.nickname} in the database!`
          );
        } else if (res.status == 400) {
          console.log(
            `/${player}.nickname is already registered in the database!`
          );
        } else {
          console.log(
            `/An error occured while registering ${player.nickname} in the database! Please try again in few seconds.`
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

module.exports = SkywarsCommand;
