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
            var guildStats = await hypixel.getGuild("player", username)

            let meetRequirements = false
            let gexpRank = "kick"
            let gexpReq = false

            if (player.stats.bedwars.wins >= config.minecraft.guild.requirements.bedwarsWins) meetRequirements = true
            if (player.stats.skywars.wins >= config.minecraft.guild.requirements.skywarsWins) meetRequirements = true
            if (player.stats.duels.wins >= config.minecraft.guild.requirements.duelsWins) meetRequirements = true
            if (player.level >= config.minecraft.guild.requirements.networkLevel) meetRequirements = true

            var weekGEXP = playerGuild.me.weeklyExperience
            if (weekGEXP > config.minecraft.guild.ranks.guards) {
                gexpRank = guards
                gexpReq = true
            } else if (weekGEXP > config.minecraft.guild.ranks.thieves) {
                gexpRank = thieves
                gexpReq = true
            } else if (weekGEXP > config.minecraft.guild.ranks.prisoners) {
                gexpRank = prisoners
                gexpReq = true
            }

            const playerEmbed = new EmbedBuilder()
                .setColor(config.discord.embedColors.dodgerBlue)
                .setTitle(`${await hypixelRankEmoji(username)} ${username}: Guild member info }`)
                .addFields(
                    {
                        name: "Guild Join date",
                        value: `${(guild.me.joinedAtTimestamp / 1000).toFixed(0)}`,
                        inline: false,
                    }
                )
        } else {
            await interaction.followUp({
                content: "You do not have permission to run this command.",
                ephemeral: true,
            });
        }
    },
};
