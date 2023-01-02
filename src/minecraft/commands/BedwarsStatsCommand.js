const { addNotation, capitalize, addCommas, getStar, register, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

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
      let hidden = false;

      if (["solo", "doubles", "threes", "fours", "4v4", "castle", "ultimate", "rush", "armed", "lucky", "voidless", "overall", "all"].includes(msg[0])) {
        mode = msg[0];
        if (msg[1] && !msg[1].includes("/")) {
          username = msg[1];
          if (msg[2] == "hidden") hidden = true;
        }
        if (msg[1] == "hidden") {
          hidden = true;
          if (msg[2] && !msg[2].includes("/")) username = msg[2];
        }
      } else {
        if (msg[0] && !msg[0].includes("/")) {
          username = msg[0];
          if (["solo", "doubles", "threes", "fours", "4v4", "castle", "ultimate", "rush", "armed", "lucky", "voidless", "overall", "all"].includes(msg[1])) mode = msg[1];
          if (["solo", "doubles", "threes", "fours", "4v4", "castle", "ultimate", "rush", "armed", "lucky", "voidless", "overall", "all"].includes(msg[2])) mode = msg[2];
          if (msg[1] == "hidden") hidden = true;
          if (msg[2] == "hidden") hidden = true;
        }
      }

      const player = await hypixel.getPlayer(username);
      var star = getStar(player.stats.bedwars.level);

      if (!mode || ["overall", "all"].includes(mode)) {
        this.send(`${hidden ? "/oc" : "/gc"} [${player.stats.bedwars.level}${star}] ${player.nickname
          } | Coins: ${addNotation("oneLetters", player.stats.bedwars.coins)
          } | FK: ${addCommas(player.stats.bedwars.finalKills)} FKDR: ${player.stats.bedwars.finalKDRatio
          } | Wins: ${addNotation("oneLetters", player.stats.bedwars.wins)} WLR: ${player.stats.bedwars.WLRatio
          } | BB: ${addNotation("oneLetters", player.stats.bedwars.beds.broken)} BLR: ${player.stats.bedwars.beds.BLRatio
          } | WS: ${player.stats.bedwars.winstreak
          } | Items Collected: Iron: ${addNotation("oneLetters", player.stats.bedwars.collectedItemsTotal.iron)} Gold: ${addNotation("oneLetters", player.stats.bedwars.collectedItemsTotal.gold)} Diamonds: ${addNotation("oneLetters", player.stats.bedwars.collectedItemsTotal.diamond)} Emeralds: ${addNotation("oneLetters", player.stats.bedwars.collectedItemsTotal.emerald)}`
        );
      } else if (["solo", "doubles", "threes", "fours", "4v4", "castle"].includes(mode)) {
        this.send(`${hidden ? "/oc" : "/gc"} [${player.stats.bedwars.level}${star}] ${player.nickname
          } | ${capitalize(mode)
          } | FK: ${addCommas(player.stats.bedwars[mode].finalKills)} FKDR: ${player.stats.bedwars[mode].finalKDRatio
          } | Wins: ${addCommas(player.stats.bedwars[mode].wins)} WLR: ${player.stats.bedwars[mode].WLRatio
          } | BB: ${addCommas(player.stats.bedwars[mode].beds.broken)} BLR: ${player.stats.bedwars[mode].beds.BLRatio
          } | WS: ${player.stats.bedwars[mode].winstreak}`
        );
      }
      else if (["ultimate", "rush", "armed", "lucky", "voidless"].includes(mode)) {
        var finalKills = player.stats.bedwars.dream[mode].doubles.finalKills + player.stats.bedwars.dream[mode].fours.finalKills
        var finalDeaths = player.stats.bedwars.dream[mode].doubles.finalDeaths + player.stats.bedwars.dream[mode].fours.finalDeaths
        var wins = player.stats.bedwars.dream[mode].doubles.wins + player.stats.bedwars.dream[mode].fours.wins
        var losses = player.stats.bedwars.dream[mode].doubles.losses + player.stats.bedwars.dream[mode].fours.losses
        var bedsBroken = player.stats.bedwars.dream[mode].doubles.beds.broken + player.stats.bedwars.dream[mode].fours.beds.broken
        var bedsLost = player.stats.bedwars.dream[mode].doubles.beds.lost + player.stats.bedwars.dream[mode].fours.beds.lost
        this.send(`${hidden ? "/oc" : "/gc"} [${player.stats.bedwars.level}${star}] ${player.nickname
          } | ${capitalize(mode)
          } | FK: ${addCommas(finalKills)} FKDR: ${(finalKills / finalDeaths).toFixed(2)
          } | Wins: ${addCommas(wins)} WLR: ${(wins / losses).toFixed(2)
          } | BB: ${addCommas(bedsBroken)} BLR: ${(bedsBroken / bedsLost).toFixed(2)
          }
        `);
      }
      await register(await getUUID(username), username)
    } catch (error) {
      await logError(username, error);
      this.send("There is no player with the given UUID or name or player has never joined Hypixel.");
      console.log(error);
    }
  }
}

module.exports = BedwarsCommand;