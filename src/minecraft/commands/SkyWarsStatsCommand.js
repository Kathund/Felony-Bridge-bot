const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
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
      if (msg[0]) username = msg[0];
      const player = await hypixel.getPlayer(username);
      this.send(
        `/gc [${player.stats.skywars.level}✫] ${player.nickname}ᐧᐧᐧᐧKDR:${player.stats.skywars.KDRatio}ᐧᐧᐧᐧWLR:${player.stats.skywars.WLRatio}ᐧᐧᐧᐧWS:${player.stats.skywars.winstreak}`
      );
      fetch(`https://api.pixelic.de/v1/player/register?key=${config.api.pixelKey}&uuid=${uuid}`, {
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
      this.send(
        "There is no player with the given UUID or name or player has never joined Hypixel."
      );
    }
  }
}

module.exports = SkywarsCommand;
