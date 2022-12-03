const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { addCommas } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class GuildEXPCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "guildexp";
    this.aliases = ["gexp", "gxp"];
    this.description = "Check a players guild experience";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      const arg = this.getArgs(message);
      if (arg[0]) username = arg[0];
      var player = await hypixel.getPlayer(username);
      var guild = await hypixel.getGuild("player", username);
      var rawGexp = guild.me.weeklyExperience;
      var gexp = addCommas(rawGexp);
      this.send(`/gc ${username}'s GEXP is ${gexp}`);
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

module.exports = GuildEXPCommand;
