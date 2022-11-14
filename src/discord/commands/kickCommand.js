const config = require("../../../config.json");

module.exports = {
  name: "kick",
  description: "Kick the given user from the Guild.",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: true,
    },
    {
      name: "reason",
      description: "Reason",
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
      const reason = interaction.options.getString("reason");
      bot.chat(`/g kick ${name} ${reason}`);
      await interaction.followUp({
        content: "Command has been executed successfully.",
        ephemeral: true,
      });
    } else {
      await interaction.followUp({
        content: "You do not have permission to run this command.",
        ephemeral: true,
      });
    }
  },
};
