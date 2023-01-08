// eslint-disable-next-line
const { EmbedBuilder } = require("discord.js");
const config = require('../../../config.json')

module.exports = {
  name: "ping",
  description: "Shows the latency of the bot.",

  execute: async (interaction, client) => {
    const embed = new EmbedBuilder()
      .setColor(config.discord.embedColors.dodgerBlue)
      .setTitle("🏓 Pong!")
      .setDescription(`Latency: ${client.ws.ping}ms`)
      .setFooter({
        text: `by DuckySoLucky#5181 | /help [command] for more information`,
        iconURL: "https://i.imgur.com/uUuZx2E.png",
      });

    interaction.followUp({ embeds: [embed] });
  },
};
