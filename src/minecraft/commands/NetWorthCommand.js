const { addNotation, capitalize, logError } = require("../../contracts/helperFunctions.js");
const { getLatestProfile } = require("../../../API/functions/getLatestProfile.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { getNetworth, getPrices } = require("skyhelper-networth");

let prices;
getPrices().then((data) => {
  prices = data;
});

setInterval(async () => {
  prices = await getPrices();
}, 1000 * 60 * 5);

class NetWorthCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "networth";
    this.aliases = ["nw"];
    this.description = "Networth of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    var playerIGN = username
    try {
      const arg = this.getArgs(message);
      if (arg[0]) username = arg[0];
      let hidden = false;
      if (arg[1] == "hidden") hidden = true;
      if (!prices) {
        return this.send(
          `${hidden ? "/oc" : "/gc"} ${username} Prices are still loading, please try again in a few seconds.`
        );
      }

      const data = await getLatestProfile(username);
      username = data.profileData?.game_mode ? `♲ ${username}` : username;

      const profile = await getNetworth(
        data.profile,
        data.profileData?.banking?.balance || 0,
        { prices }
      );
      if (profile.noInventory) {
        return this.send(
          `${hidden ? "/oc" : "/gc"} ${capitalize(username)} has an Inventory API off!`
        );
      }

      this.send(
        `${hidden ? "/oc" : "/gc"} ${capitalize(username)}'s Networth is ${addNotation("oneLetters", profile.networth) ?? 0
        } | Unsoulbound Networth: ${addNotation("oneLetters", profile.unsoulboundNetworth) ?? 0
        } | Purse: ${addNotation("oneLetters", profile.purse) || 0} | Bank: ${addNotation("oneLetters", profile.bank) ?? 0
        }`
      );
    } catch (error) {
      await logError(playerIGN, error);
      console.log(error);
      this.send(
        "/gc There is no player with the given UUID or name or the player has no Skyblock profiles"
      );
    }
  }
}

module.exports = NetWorthCommand;
