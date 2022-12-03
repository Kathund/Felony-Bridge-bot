const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class CSGOCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "csgo";
    this.aliases = ["copsandcrims", "cac"];
    this.description = "Cops And Crims info of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const args = this.getArgs(message);
      if (args[0]) username = args[0];
      const player = hypixel.getPlayer(username);
      this.send(
        `/gc [ ${player.rank} ] ${player.nickanme}: Cops And Crims Stats | Kills: ${player.stats.copsandcrims.kills} Deaths: ${player.stats.copsandcrims.deaths} KD: ${player.stats.copsandcrims.KDRatio} | Wins ${player.stats.copsandcrims.wins}`
      );
      fetch(
        `https://api.pixelic.de/v1/player/register?key=${config.api.pixelicKey}&uuid=${player.uuid}`,
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
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = CSGOCommand;
