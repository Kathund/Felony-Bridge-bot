const {
  addNotation,
  capitalize,
  addCommas,
} = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class BedwarsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "bedwars";
    this.aliases = ["bw", "bws"];
    this.description = "BedWars stats of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message);
      let mode = null;

      if (["solo", "doubles", "threes", "fours", "4v4"].includes(msg[0])) {
        mode = msg[0];
        if (msg[1] && !msg[1].includes("/")) {
          username = msg[1];
        }
      } else {
        if (msg[0] && !msg[0].includes("/")) {
          username = msg[0];
        }

        if (["solo", "doubles", "threes", "fours", "4v4"].includes(msg[1])) {
          mode = msg[1];
        }
      }

      const player = await hypixel.getPlayer(username);
      var star = "${star}";
      if (player.stats.bedwars.level >= 0) star = "✫";
      if (player.stats.bedwars.level >= 1100) star = "✪";
      if (player.stats.bedwars.level >= 2100) star = "⚝";

      if (!mode || ["overall", "all"].includes(mode)) {
        this.send(
          `/gc [${player.stats.bedwars.level}${star}] ${
            player.nickname
          } | Coins: ${addNotation(
            "oneLetters",
            player.stats.bedwars.coins
          )} | FK: ${addCommas(player.stats.bedwars.finalKills)} FKDR: ${
            player.stats.bedwars.finalKDRatio
          } | Wins: ${addNotation(
            "oneLetters",
            player.stats.bedwars.wins
          )} WLR: ${player.stats.bedwars.WLRatio} | BB: ${addNotation(
            "oneLetters",
            player.stats.bedwars.beds.broken
          )} BLR: ${player.stats.bedwars.beds.BLRatio} | WS: ${
            player.stats.bedwars.winstreak
          } | Items Collected: Iron: ${addNotation(
            "oneLetters",
            player.stats.bedwars.collectedItemsTotal.iron
          )} Gold: ${addNotation(
            "oneLetters",
            player.stats.bedwars.collectedItemsTotal.gold
          )} Diamonds: ${addNotation(
            "oneLetters",
            player.stats.bedwars.collectedItemsTotal.diamond
          )} Emeralds: ${addNotation(
            "oneLetters",
            player.stats.bedwars.collectedItemsTotal.emerald
          )}`
        );
      } else if (mode) {
        this.send(
          `/gc [${player.stats.bedwars.level}${star}] ${
            player.nickname
          } ${capitalize(mode)} FK: ${addCommas(
            player.stats.bedwars[mode].finalKills
          )} FKDR: ${player.stats.bedwars[mode].finalKDRatio} Wins: ${addCommas(
            player.stats.bedwars[mode].wins
          )} WLR: ${player.stats.bedwars[mode].WLRatio} BB: ${addCommas(
            player.stats.bedwars[mode].beds.broken
          )} BLR: ${player.stats.bedwars[mode].beds.BLRatio} WS: ${
            player.stats.bedwars[mode].winstreak
          }`
        );
      }
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
            `An error occured while registering ${player.nickname} in the database! Please try again in few seconds.`
          );
        }
      });
    } catch (error) {
      this.send(
        "There is no player with the given UUID or name or player has never joined Hypixel."
      );
      console.log(error);
    }
  }
}

module.exports = BedwarsCommand;
