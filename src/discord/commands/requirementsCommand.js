const config = require("../../../config.json");
// eslint-disable-next-line
const { EmbedBuilder } = require("discord.js");
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");

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
    const name = interaction.options.getString("name");
    var player = await hypixel.getPlayer(name);


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

    var plusColor = player.plusColor
    var plusPlusColor = player.prefixColor

    var rank = player.rank;
    if (player.rank == "VIP") rank = config.other.emojis.discord.ranks.VIP
    if (player.rank == "VIP+") rank = config.other.emojis.discord.ranks.VIP_PLUS
    if (player.rank == "MVP") rank = config.other.emojis.discord.ranks.MVP
    if (player.rank == "MVP+") rank = config.other.emojis.discord.ranks.MVP_PLUS[plusColor.color]
    if (player.rank == "MVP++") rank = config.other.emojis.discord.ranks.MVP_PLUS_PLUS[plusPlusColor.color][plusColor.color]
    if (player.rank == "Game Master") rank = config.other.emojis.discord.ranks.GAME_MASTER
    if (player.rank == "Admin") rank = config.other.emojis.discord.ranks.ADMIN
    if (player.rank == "Youtube") rank = config.other.emojis.discord.ranks.YOUTUBE

    const statsEmbed = new EmbedBuilder()
      .setColor(`${meetRequirements ? "0x1FFF4C" : "0xf92121"}`)
      .setTitle(
        `${rank}  ${player.nickname}: has requested to join the Guild!`
      )
      .setDescription(
        `${player.nickname} ${meetRequirements ? "**has**" : "**dose not**"
        } the requirements to join the Guild!`
      )
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
