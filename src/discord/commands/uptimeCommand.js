const { toFixed } = require("../../contracts/helperFunctions.js");
// eslint-disable-next-line
const { EmbedBuilder } = require("discord.js");
const config = require('../../../config.json')

module.exports = {
  name: "uptime",
  description: "Shows the uptime of the bot.",

  execute: async (interaction, client) => {
    const uptimeEmbed = new EmbedBuilder()
      .setColor(config.discord.embedColors.dodgerBlue)
      .setTitle("🕐 Uptime!")
      .setDescription(`Online since <t:${toFixed(uptime / 1000, 0)}:R>`)
      .setFooter({
        text: `by Kathund#2004 | /help [command] for more information`,
        iconURL: "https://i.imgur.com/uUuZx2E.png",
      });

    interaction.followUp({ embeds: [uptimeEmbed] });
  },
};
