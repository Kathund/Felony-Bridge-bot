const { hypixelRankEmoji } = require("../../contracts/helperFunctions.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
// eslint-disable-next-line
const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
  name: "requirements",
  description: "Alows you to check if someone has the requirements",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: true,
    }
  ],

  execute: async (interaction, client) => {
    const username = interaction.options.getString("name");
    var player = await hypixel.getPlayer(username);

    let meetRequirements = false;
    let hasBWWins = false;
    let hasSWWins = false;
    let hasDuelsWins = false;
    let hasNetworkLevel = false;

    const bwWins = player.stats.bedwars.wins;
    const swWins = player.stats.skywars.wins;
    const duelsWins = player.stats.duels.wins;
    const networkLevel = player.level

    if (
      bwWins >= config.minecraft.guild.requirements.bedwarsWins
    ) {
      (hasBWWins = true), (meetRequirements = true);
    }
    if (
      swWins >= config.minecraft.guild.requirements.skywarsWins
    ) {
      (hasSWWins = true), (meetRequirements = true);
    }
    if (
      duelsWins >= config.minecraft.guild.requirements.duelsWins
    ) {
      (hasDuelsWins = true), (meetRequirements = true);
    }
    if (
      networkLevel >= config.minecraft.guild.requirements.networkLevel
    ) {
      (hasNetworkLevel = true), (meetRequirements = true)
    }

    const statsEmbed = new EmbedBuilder()
      .setColor(`${meetRequirements ? config.discord.embedColors.lime : config.discord.embedColors.red}`)
      .setTitle(`${await hypixelRankEmoji(username)}  ${player.nickname} ${meetRequirements ? "**has**" : "**has not got**"} the requirements to join the ${config.minecraft.guild.name}!`)
      .addFields(
        {
          name: "Bedwars",
          value: `Wins - ${bwWins}/${config.minecraft.guild.requirements.bedwarsWins
            } ${hasBWWins
              ? config.other.emojis.discord.yes
              : config.other.emojis.discord.no
            }`,
          inline: false,
        },
        {
          name: "Skywars",
          value: `Wins - ${swWins}/${config.minecraft.guild.requirements.skywarsWins
            } ${hasSWWins
              ? config.other.emojis.discord.yes
              : config.other.emojis.discord.no
            }`,
          inline: false,
        },
        {
          name: "Duels",
          value: `Wins - ${duelsWins}/${config.minecraft.guild.requirements.duelsWins
            } ${hasDuelsWins
              ? config.other.emojis.discord.yes
              : config.other.emojis.discord.no
            }`,
          inline: false,
        },
        {
          name: "Level",
          value: `Level - ${networkLevel}/${config.minecraft.guild.requirements.networkLevel
            } ${hasNetworkLevel
              ? config.other.emojis.discord.yes
              : config.other.emojis.discord.no
            }`,
          inline: false,
        }
      )
      .setThumbnail(`https://www.mc-heads.net/avatar/${player.nickname}`)
      .setTimestamp()
      .setFooter({
        text: `by Kathund#2004 | /help [command] for more information`,
      });
    await interaction.followUp({ embeds: [statsEmbed] });
  },
};
