const config = require("../../../config.json");
// eslint-disable-next-line
const { EmbedBuilder } = require('discord.js')
const { generateID } = require('../../contracts/helperFunctions.js')

module.exports = {
    name: "reload",
    description: "Reloads the guild bot",

    execute: async (interaction, client) => {
        let hasPerms = false;
        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.guildMaster)) hasPerms = true;
        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.wardens)) hasPerms = true;
        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.staff.police)) hasPerms = true;    
        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.botDev)) hasPerms = true;
        if (hasPerms) {
            bot.chat(`/gc The Bot is restarting! - ${generateID(config.minecraft.messageRepeatBypassLength)}`);
            const loggingEmbed = new EmbedBuilder()
                .setColor(16733070)
                .setTitle(`Bot Restarting!`)
                .setTimestamp()
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
