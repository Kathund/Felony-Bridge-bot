const fetch = (...args) => import('node-fetch').then(({
  default: fetch
}) => fetch(...args)).catch(err => console.log(err));
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
        const msg = this.getArgs(message);
        if (msg[0]) username = msg[0];
        const guild = await hypixel.getGuild('name', config.minecraft.guild.name);
        var a = guild.members;

        var guildMembers = [];

        for (const member in a) {
            guildMembers.push(a[member].uuid)
        }
        var amount = guildMembers.length;
        console.log(amount)
        console.log(guildMembers[0])
        var i = guildMembers[1]
        var player = await hypixel.getPlayer(i)
        this.send(`/gc ${player.nickname}`)
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
