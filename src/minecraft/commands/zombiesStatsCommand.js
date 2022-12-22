const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { register } = require("../../contracts/helperFunctions.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

class ZombiesCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "zombies";
    this.aliases = [];
    this.description = "Zombies Stats of specified user.";
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
      var stats = player.stats.arcade.zombies;
      this.send(
        `${hidden ? "/oc" : "/gc"} [${player.rank}] ${player.nickname}: Coins: ${player.stats.arcade.coins} | Wins: ${stats.overall.wins} | Kills: ${stats.overall.zombieKills} | Deaths: ${stats.overall.deaths} | Shots: ${stats.bulletsShot} Hits: ${stats.bulletsHit} Accuracy: ${stats.gunAccuracy} Headshot Accuracy ${stats.headshotAccuracy}`
      );
      await register(await getUUID(username), username)
    } catch (error) {
      this.send(
        "There is no player with the given UUID or name or player has never joined Hypixel."
      );
    }
  }
}

module.exports = ZombiesCommand;
