const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json");
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "reload",
    description: "Reloads the guild bot",

    execute: async (interaction, client) => {
        let hasPerms = false;
        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.botDev)) hasPerms = true;
        if (hasPerms) {
            bot.chat(`/gc The Bot is restarting!`)
            const loggingEmbed = new EmbedBuilder()
                .setColor(16733070)
                .setTitle(`Bot Restarting!`)
                .setTimestamp()
                .setFooter({ text: `by Kathund#2004 | /help [command] for more information` });
            await client.channels.cache.get(`${config.discord.loggingChannel}`).send({ embeds: [loggingEmbed] });
            await interaction.followUp({
                content: "Command has been executed successfully.",
                ephemeral: true,
            });
            process.exit(0);
        } else {
            await interaction.followUp({
                content: "You do not have permission to run this command.",
                ephemeral: true,
            });
        }
    },
};
