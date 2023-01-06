/*eslint-disable */
const { logError } = require("../../contracts/helperFunctions.js");
const { ActivityType } = require("discord.js");
const config = require("../../../config.json");
const logger = require("../../Logger.js");
/*eslint-enable */

class StateHandler {
  constructor(discord) {
    this.discord = discord;
  }

  async onReady() {
    logger.discordMessage("Client ready, logged in as " + this.discord.client.user.tag);
    this.discord.client.user.setPresence({
      activities: [
        { name: `Felony Guild Chat`, type: ActivityType.Watching },
      ],
    });
    const channel = await getChannel("Guild");
    global.bridgeChat = config.discord.guildChatChannel;
    global.uptime = new Date().getTime();

    channel.send({
      embeds: [
        {
          author: { name: `${config.other.emojis.discord.online} Chat Bridge is Online` },
          color: 2067276,
        },
      ],
    })
    await logError(config.minecraft.bot.name, "bot has gone online")
  }

  async onClose() {
    await logError(config.minecraft.bot.name, "bot has gone offline - @everyone")
    const channel = await getChannel("Guild");
    global.bridgeChat = config.discord.guildChatChannel;
    channel.send({
      embeds: [
        {
          author: { name: `${config.other.emojis.discord.online} Chat Bridge is Offline` },
          color: 15548997,
        }
      ]
    })
    process.exit();
  }
}

async function getChannel(type) {
  if (type == "Officer") {
    return client.channels.fetch(config.discord.officerChannel);
  } else if (type == "Logger") {
    return client.channels.fetch(config.discord.loggingChannel);
  } else if (type == "debugChannel") {
    return client.channels.fetch(config.console.debugChannel);
  } else {
    return client.channels.fetch(config.discord.guildChatChannel);
  }
}

module.exports = StateHandler;
