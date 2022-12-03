const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class MurderMysteryCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "MurderMystery";
    this.aliases = ["mm"];
    this.description = "Murder Mystery Stats of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message);
      if (msg[0]) username = msg[0];
      const player = await hypixel.getPlayer(username);
      var stats = player.stats.murdermystery;
      var losses = stats.playedGames - stats.wins;
      var mmWLR = stats.wins / losses;
      this.send(
        `/gc [${player.rank} ${player.nickname}]: Wins: ${stats.wins} Losses: ${losses} WLR ${mmWLR} Played Games: ${stats.playedGames} | Kills: ${stats.zombieKills} Deaths: ${stats.deaths} KD ${stats.KDRatio}`
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

module.exports = MurderMysteryCommand;
