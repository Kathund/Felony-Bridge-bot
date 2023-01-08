const config = require("../../../config.json");
// eslint-disable-next-line
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "execute",
  description: "Executes commands as the minecraft bot.",
  options: [
    {
      name: "command",
      description: "Minecraft Command",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction, client) => {
    let hasPerms = false;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.guildMaster)) hasPerms = true;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.wardens)) hasPerms = true;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.police)) hasPerms = true;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.bypassrole)) hasPerms = true;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.botDev)) hasPerms = true;
    if (hasPerms) {
      const command = interaction.options.getString("command");
      bot.chat(`/${command}`);
      const commandMessage = new EmbedBuilder()
        .setColor(config.discord.embedColors.green)
        .setTitle("Command has been executed successfully")
        .setDescription(`\`/${command}\`\n`)
        .setFooter({
          text: "by Kathund#2004",
          iconURL: "https://i.imgur.com/uUuZx2E.png",
        });
      await interaction.followUp({ embeds: [commandMessage], ephemeral: true });
    } else {
      await interaction.followUp({
        content: "You do not have permission to run this command.",
        ephemeral: true,
      });
    }
  },
};
