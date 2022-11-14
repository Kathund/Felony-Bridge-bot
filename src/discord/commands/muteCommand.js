const config = require("../../../config.json");

module.exports = {
  name: "mute",
  description: "Mutes the given user for a given amount of time.",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: true,
    },
    {
      name: "time",
      description: "Time",
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
      const time = interaction.options.getString("time");
      bot.chat(`/g mute ${name} ${time}`);
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
