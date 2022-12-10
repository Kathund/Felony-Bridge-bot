const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const { getStats } = require("../../contracts/helperFunctions.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class DailyStatsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "daily";
    this.aliases = [""];
    this.description = "Get your daily stats";
    this.options = ["name", "gamemode"];
    this.optionsDescription = ["Minecraft Username", "Hypixel Gamemode"];
  }

  async onCommand(username, message) {
    const args = this.getArgs(message);
    let mode,
      player = username;

    if (
      [
        "bw",
        "bedwars",
        "bedwar",
        "bws",
        "sw",
        "skywars",
        "skywar",
        "sws",
        "duels",
        "duel",
        "d",
        "gen",
        "g",
        "general",
      ].includes(args[0])
    ) {
      mode = args[0];
      if (args[1]) player = args[1];
    }
    if (
      [
        "bw",
        "bedwars",
        "bedwar",
        "bws",
        "sw",
        "skywars",
        "skywar",
        "sws",
        "duels",
        "duel",
        "d",
        "gen",
        "g",
        "general",
      ].includes(args[1])
    ) {
      mode = args[1];
      player = args[0];
    }

    const uuid = await getUUID(player);

    try {
      this.send(`/gc Fetching ${player}'s daily stats..`)
      await delay(1000)
      console.log(await getStats(player, uuid, mode, "daily", username))
    } catch (error) {
      if (error.response?.data?.error == "Player not in database") {
        this.send(
          `/gc ${player == username ? "You are" : `${player} is`
          } not in the database. ${player == username ? "You are" : `${player} is`
          } being added to the database..`
        );

        fetch(
          `${config.api.pixelicAPI}/player/register?key=${config.api.pixelicKey}&uuid=${uuid}`,
          {
            method: "POST",
          }
        ).then((res) => {
          if (res.status == 201) {
            this.send(`/gc Successfully registered ${player} in the database!`);
          } else if (res.status == 400) {
            this.send(`/gc ${player} is already registered in the database!`);
          } else {
            this.send(
              `/gc An error occured while registering ${player} in the database! Please try again in few seconds.`
            );
          }
        });
      }
    }
  }
}

module.exports = DailyStatsCommand;
