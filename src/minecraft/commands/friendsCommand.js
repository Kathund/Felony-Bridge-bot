const { register, logError } = require("../../contracts/helperFunctions.js");
const minecraftCommand = require("../../contracts/minecraftCommand.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { getUUID } = require("../../contracts/API/MojangAPI.js");

class FriendsCommand extends minecraftCommand {
  constructor(minecraft) {
    super(minecraft);

    this.name = "friends";
    this.aliases = [];
    this.description = "friends info of specified user.";
    this.options = ["name"];
    this.optionsDescription = ["Minecraft Username"];
  }

  async onCommand(username, message) {
    try {
      const msg = this.getArgs(message);
      if (msg[0]) username = msg[0];
      let hidden = false;
      if (msg[1] == "hidden") hidden = true;
      const player = await hypixel.getPlayer(username);
      const friend = await hypixel.getFriends(username);
      const friends = friend.length + 1;
      this.send(
        `${hidden ? "/oc" : "/gc"} [${player.rank}] ${player.nickname} has ${friends} friends`
      );
      await register(await getUUID(username), username)
    } catch (error) {
      await logError(username, error);
      console.log(error);
      this.send(`/gc Something went wrong`);
    }
  }
}

module.exports = FriendsCommand;
