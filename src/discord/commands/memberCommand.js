const { hypixelRankEmoji } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
// eslint-disable-next-line
const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "memeber",
    description: "Shows info about a user",
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
        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.bypassrole)) hasPerms = true;
        if (hasPerms) {
            const username = interaction.options.getString("name");
            var player = await hypixel.getPlayer(username);
            var guildInfo = await hypixel.getGuild("player", username)

            let meetRequirements = false
            let gexpRank = "kick"

            if (player.stats.bedwars.wins >= config.minecraft.guild.requirements.bedwarsWins) meetRequirements = true
            if (player.stats.skywars.wins >= config.minecraft.guild.requirements.skywarsWins) meetRequirements = true
            if (player.stats.duels.wins >= config.minecraft.guild.requirements.duelsWins) meetRequirements = true
            if (player.level >= config.minecraft.guild.requirements.networkLevel) meetRequirements = true

            var weekGEXP = guildInfo.me.weeklyExperience
            if (weekGEXP >= config.minecraft.guild.ranks.guards) gexpRank = guards
            if (weekGEXP >= config.minecraft.guild.ranks.thieves) gexpRank = thieves
            if (weekGEXP >= config.minecraft.guild.ranks.prisoners) gexpRank = prisoners

            const playerEmbed = new EmbedBuilder()
                .setColor(config.discord.embedColors.dodgerBlue)
                .setTitle(`${await hypixelRankEmoji(username)} ${username}: Guild member info }`)
                .addFields(
                    {
                        name: "Guild Join date",
                        value: `<:t:${(guildInfo.me.joinedAtTimestamp / 1000).toFixed(0)}:f>`,
                        inline: true,
                    },
                    {
                        name: "Guild Rank",
                        value: `Guild Rank: ${guildInfo.me.rank}\nGuild Rank Based of gexp: ${gexpRank}`,
                        inline: true,
                    },
                    {
                        name: "Guild Experience",
                        value: `This week: ${guildInfo.me.weeklyExperience}\n7d adv: ${(guildInfo.me.weeklyExperience / 7).toFixed(0)}`,
                        inline: true,
                    },
                    {
                        name: "Meet Requirements",
                        value: `${meetRequirements ? config.other.emojis.discord.yes : config.other.emojis.discord.no}`,
                        iniine: true,
                    }
                )
                .setThumbnail(`https://www.mc-heads.net/avatar/${player.nickname}`)
                .setTimestamp()
                .setFooter({
                    text: `by Kathund#2004 | /help [command] for more information`,
                });
            await interaction.followUp({ embeds: [playerEmbed] });
        } else {
            await interaction.followUp({
                content: "You do not have permission to run this command.",
                ephemeral: true,
            });
        }
    },
};
