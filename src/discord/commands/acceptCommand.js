const config = require("../../../config.json");

module.exports = {
  name: "accept",
  description: "Accepted the given user to the guild.",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction, client) => {
    let hasPerms = false;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.guildMaster)) hasPerms = true;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.wardens)) hasPerms = true;
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.police)) hasPerms = true;
    if (hasPerms) {
      const name = interaction.options.getString("name");
      bot.chat(`/g accept ${name}`);
      await interaction.followUp({
        content: "Command has been executed successfully - Check <#1035511927524298813>",
        ephemeral: false,
      });
    } else {
      await interaction.followUp({
        content: "You do not have permission to run this command.",
        ephemeral: true,
      });
    }
  },
};
