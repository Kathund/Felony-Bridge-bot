/*eslint-disable */
const { ActivityType } = require("discord.js");
const config = require("../../../config.json");
const Logger = require("../../Logger.js");
/*eslint-enable */

class StateHandler {
  constructor(discord) {
    this.discord = discord;
  }

  async onReady() {
    Logger.discordMessage("Client ready, logged in as " + this.discord.client.user.tag);
    this.discord.client.user.setPresence({
      activities: [
        { name: `/help | by Kathund#2004`, type: ActivityType.Playing },
      ],
    });
    const channel = await getChannel("Guild");
    global.bridgeChat = config.discord.guildChatChannel;
    global.uptime = new Date().getTime();

    channel.send({
      embeds: [
        {
          author: { name: `${config.discord.emojis.online} Chat Bridge is Online` },
          color: 2067276,
        },
      ],
    });
  }

  async onClose() {
    const channel = await getChannel("Guild");
    global.bridgeChat = config.discord.guildChatChannel;
    channel.send({
      embeds: [
        {
          author: { name: `${config.discord.emojis.offline} Chat Bridge is Offline` },
          color: 15548997,
        }
      ]
    }).then(() => { process.exit(); });
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
