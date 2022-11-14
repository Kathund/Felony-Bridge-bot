const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")

class GCheckCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "aaaafdsdfsfggfds";
    this.aliases = [];
    this.description = "no";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
        // const check = await hypixel.getGuild(`player`, username)
        // if (check.me.rank == "Police" || check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
        if (username == 'Udderly_cool') {
            const guild = await hypixel.getGuild('name', config.minecraft.guild.name);
            await delay(500)
            console.log(guild.members)
        } else {
            // this.send(`/gc This is a staff only command`)
            this.send(`/gc Kaths making this command`)
        }
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GCheckCommand;
