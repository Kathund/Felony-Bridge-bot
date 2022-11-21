const config = require("../../../config.json");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

module.exports = {
    name: "reload",
    description: "Reloads the guild bot",

    execute: async (interaction, client) => {
        let hasPerms = false;
        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.botDev)) hasPerms = true;
        if (hasPerms) {
            const name = interaction.options.getString("name");
            bot.chat(`/gc The Bot is restarting!`)
            const loggingEmbed = new EmbedBuilder()
                .setColor(16733070)
                .setTitle(`Bot Restarting!`)
                .setThumbnail(`https://www.mc-heads.net/avatar/Udderly_cool`)
                .setTimestamp()
                .setFooter({ text: `by Kathund#2004 | /help [command] for more information` });
            await client.channels.cache.get(`${config.discord.loggingChannel}`).send({ embeds: [loggingEmbed] });
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
