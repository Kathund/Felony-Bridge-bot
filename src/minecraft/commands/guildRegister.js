const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")
const fetch = (...args) =>
  import("node-fetch")
    .then(({ default: fetch }) => fetch(...args))
    .catch((err) => console.log(err));

class GRegister extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "registerguild";
    this.aliases = [];
    this.description = "no";
    this.options = [];
  }

  async onCommand(username, message) {
    try {
      if (username == 'Hiltast') {
        const args = this.getArgs(message);
        if (args[0]) username = args[0];
        const check = await hypixel.getGuild('player', username);
        var members = check.members;
        var guildMembers = [];
        for (const member in members) {
          guildMembers.push(members[member].uuid)
        }
        var f = guildMembers.entries();
        let num = 0
        await delay(2000)
        console.log(`adding ${guildMembers.length()} users to database from the guild ${check.name}`)
        for (let x of f) {
          var i = guildMembers[num]
          var player = hypixel.getPlayer(i)
          fetch(`https://api.pixelic.de/v1/player/register?key=${config.api.pixelKey}&uuid=${player.uuid}`, {
            method: "POST",
          }).then((res) => {
            if (res.status == 201) {
              console.log(`Successfully registered ${player.nickname} in the database!`);
            } else if (res.status == 400) {
              console.log(`${player.nickname} is already registered in the database!`);
            } else {
              console.log(`An error occured while registering ${player.nickanem} in the database! Please try again in few seconds.`);
            }
          });

          num = num + 1
          x = x + 1
        }
        console.log(`done`)
      } else {
        this.send(`/gc This is a staff only command`)
      }
    } catch (error) {
      console.log(error);
      this.send("/gc Something went wrong..");
    }
  }
}

module.exports = GRegister;
