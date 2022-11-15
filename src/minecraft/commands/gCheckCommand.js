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
      if (username == 'Udderly_cool' || username == 'Join_FELONY') {
        const check = await hypixel.getGuild('name', config.minecraft.guild.name);
        var members = check.members;

        var guildMembers = [];

        for (const member in members) {
          guildMembers.push(members[member].uuid)
        }
        var f = guildMembers.entries();
        let num = 0
        this.send(`/oc Checking ${guildMembers.length} members`)
        await delay(2000)
        for (let x of f) {
          var i = guildMembers[num]
          var player = await hypixel.getPlayer(i)
          console.log(`${player.nickname} = ${guildMembers[num]} = ${num}`)
          var guild = await hypixel.getGuild('player', i)
          if (guild.me.rank == "Police" || guild.me.rank == "Wardens" || guild.me.rank == "Guild Master") {
            console.log(`${player.nickname} is a staff member`)
          } else {
            const weekGEXP = guild.me.weeklyExperience
            if (weekGEXP > config.minecraft.guild.ranks.guards) {
              this.send(`/go ${player.nickname} is now Guards`)
              await delay(3000)
              this.minecraft.bot.chat(`/g setrank ${player.nickname} Guards`)
            } else if (weekGEXP > config.minecraft.guild.ranks.thieves) {
              this.send(`/go ${player.nickname} is now Thieves`)
              await delay(3000)
              this.minecraft.bot.chat(`/g setrank ${player.nickname} Thieves`)
            } else if (weekGEXP > config.minecraft.guild.ranks.prisoners) {
              this.send(`/go ${player.nickname} is now Prisoners`)
              await delay(3000)
              this.minecraft.bot.chat(`/g setrank ${player.nickname} Prisoners`)
            } else {
              this.send(`/go ${player.nickname} dose not have the 50k gxp`)
              await delay(3000)
              if (config.minecraft.guild.kicking == false) {
                this.send(`/oc Kicking is disabled`)
                await delay(3000)
                this.minecraft.bot.chat(`/g setrank ${player.nickname} Prisoners`)
              } else {
                this.send(`/g kick ${player.nickname} Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
              }
            }
          }
          num = num + 1
          x = x + 1
        }
        this.send(`/oc Done`)
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
