const { logError } = require("../../contracts/helperFunctions.js")
const config = require("../../../config.json")
const logger = require("../.././Logger.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => { });

      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        logger.discordMessage(`${interaction.user.username} - [${interaction.commandName}]`);

        bridgeChat = interaction.channelId;

        await command.execute(interaction, interaction.client);
      } catch (error) {
        await logError(config.minecraft.bot.name, error)
        console.log(error);

        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
