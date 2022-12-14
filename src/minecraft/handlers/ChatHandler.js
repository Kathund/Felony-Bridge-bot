
const { replaceAllRanks, logError, hypixelRankEmoji } = require("../../contracts/helperFunctions.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const eventHandler = require("../../contracts/EventHandler.js");
const messages = require("../../../messages.json");
// eslint-disable-next-line
const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");
const logger = require("../../logger.js");
const fs = require("fs");
let guildInfo = [],
  guildRanks = [],
  members = [],
  guildTop = [];

class StateHandler extends eventHandler {
  constructor(minecraft, command, discord) {
    super();
    this.minecraft = minecraft;
    this.discord = discord;
    this.command = command;
  }

  registerEvents(bot) {
    this.bot = bot;
    this.bot.on("message", (message) => this.onMessage(message));
  }

  async onMessage(event) {
    const message = event.toString();
    const colouredMessage = event.toMotd();

    if (this.isLobbyJoinMessage(message)) {
      await logError(config.minecraft.bot.name, `Client sent to limbo, logged in as ${config.minecraft.bot.name}`, this.name, message);
      return bot.chat("\u00a7");
    }

    // if (this.isPartyMessage(message)) {
    //   const username = replaceAllRanks(message.substr(54));
    //   await delay(69);
    //   this.send(`/party accept ${username}`);
    //   await delay(420);
    //   this.send(
    //     `/pc Look you found the ${config.minecraft.guild.name}'s frag bot! This bot will leave in 5 seconds! Have fun - Made by Kathund#2004`
    //   );
    //   awwait delay(5000);
    //   this.send(`/party leave`);
    // }

    if (this.isGuildTopMessage(message)) {
      if (!message.includes("10.")) {
        guildTop.push(message);
      } else {
        guildTop.push(message);
        let description = "",
          guildTopInfo = [];
        for (let i = 1; i < guildTop.length; i++) {
          guildTop[i] = replaceAllRanks(guildTop[i]);
          guildTopInfo = guildTop[i].split(" ");
          description = `${description}\n${guildTopInfo[0]} \`${guildTopInfo[1]}\` ${guildTopInfo[2]} ${guildTopInfo[3]} ${guildTopInfo[4]}`;
        }

        this.minecraft.broadcastHeadedEmbed({
          message: `${description}`,
          title: "Top Guild Experience",
          color: 2067276,
          channel: "Guild",
        });
        (guildTop = []), (guildTopInfo = []), (description = "");
      }
    }

    if (this.isRequestMessage(message)) {
      const username = replaceAllRanks(
        message
          .split("has")[0]
          .replaceAll(
            "-----------------------------------------------------\n",
            ""
          )
      );
      if (config.minecraft.guild.joinChecker) {
        const player = await hypixel.getPlayer(username)

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

        bot.chat(
          `/oc [${player.rank}] ${player.nickname}: ${meetRequirements ? "has" : "hasnt got"
          } the requirements to join ${config.minecraft.guild.name}!`
        );

        const statsEmbed = new EmbedBuilder()
          .setColor(`${meetRequirements ? config.discord.embedColors.lime : config.discord.embedColors.red}`)
          .setTitle(`${await hypixelRankEmoji(username)}  ${player.nickname}: has requested to join the Guild!`)
          .setDescription(`${player.nickname} ${meetRequirements ? "**has**" : "**has not got**"} the requirements to join the ${config.minecraft.guild.name}!`)
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
        await client.channels.cache
          .get(`${config.discord.loggingChannel}`)
          .send({ embeds: [statsEmbed] });
        if (meetRequirements == true) {
          if (config.minecraft.guild.autoAccept == true) {
            await delay(300);
            bot.chat(`/g accept ${player.nickname}`);
          }
        }
      }
    }

    if (this.isGuildListMessage(message)) {
      if (!message.includes("Online Members")) {
        if (
          message.includes("Guild Name") ||
          message.includes("Total Members") ||
          message.includes("Online Members")
        ) {
          guildInfo.push(message);
        } else if (message.includes("--")) {
          guildRanks.push(message);
        } else {
          members.push(message);
        }
      } else {
        guildInfo.push(message);
        const guildInfoSplit = guildInfo[0].split(" ");
        const guildInfoSplit2 = guildInfo[1].split(" ");
        const guildInfoSplit3 = guildInfo[2].split(" ");
        for (let i = 0; i < members.length; i++) {
          members[i] = replaceAllRanks(members[i]);
          members[i] = members[i].replaceAll("  ", " ");
          members[i] = members[i].replaceAll(" ??? ", "` ??? `");
          String.prototype.reverse = function () {
            return this.split("").reverse().join("");
          };
          String.prototype.replaceLast = function (what, replacement) {
            return this.reverse()
              .replace(new RegExp(what.reverse()), replacement.reverse())
              .reverse();
          };
          members[i] = members[i].replaceLast(" ???", "`");
          members[i] = members[i].replaceLast("??? `", "");
        }
        let description = `Member Count: **${guildInfoSplit2[2]}/125**\nOnline Members: **${guildInfoSplit3[2]}**\n`;
        for (let i = 0; i < guildRanks.length; i++) {
          description += `\n`;
          guildRanks[i] = guildRanks[i].replaceAll("--", "**");
          description += `${guildRanks[i]}\n \`${members[i]}`;
        }

        this.minecraft.broadcastHeadedEmbed({
          message: `${description}`,
          title: guildInfoSplit[2],
          icon: `https://hypixel.paniek.de/guild/${config.minecraft.guild.id}/banner.png`,
          color: 2067276,
          channel: "Officer",
        });
        this.minecraft.broadcastHeadedEmbed({
          message: `${description}`,
          title: guildInfoSplit[2],
          icon: `https://hypixel.paniek.de/guild/${config.minecraft.guild.id}/banner.png`,
          color: 2067276,
          channel: "Guild",
        });
        guildInfo = [];
        guildRanks = [];
        members = [];
      }
    }

    // Check if the message is a login message
    if (this.isLoginMessage(message)) {
      // Read the config file
      const data = JSON.parse(fs.readFileSync("config.json"));
      // Check if the join message is enabled
      if (data.discord.joinMessage) {
        // Get the username from the message
        const user = message.split(">")[1].trim().split("joined.")[0].trim();
        // Wait 500ms
        await delay(1000)
        // Check if the welcome back messge is enabled
        if (data.minecraft.guild.autoWelcomeBack) {
          // Send the welcome back message
          if (user == 'xStxppxd') { this.send(`/gc OMG HI BURGER ILY SO MUCH PLEASE MARRY `) }
          else { this.send(`/gc ${messages.userLoginMessageFirst} ${user} ${messages.userLoginMessageSecond}`) }
        }
        // Send the login message to the guild
        return this.minecraft.broadcastPlayerToggle({
          fullMessage: colouredMessage,
          username: user,
          message: messages.loginMessage,
          color: 2067276,
          channel: "Guild",
        });
      }
    }

    if (this.isLogoutMessage(message)) {
      const data = JSON.parse(fs.readFileSync("config.json"));
      if (data.discord.joinMessage) {
        const user = message.split(">")[1].trim().split("left.")[0].trim();
        return this.minecraft.broadcastPlayerToggle({
          fullMessage: colouredMessage,
          username: user,
          message: messages.logoutMessage,
          color: 15548997,
          channel: "Guild",
        });
      }
    }

    if (this.isJoinMessage(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[0];
      await delay(1000);
      if (config.minecraft.guild.guildJoinMessage == true) {
        const num = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        bot.chat(`/gc ${messages.guildJoinMessage[num]} | By Kathund#2004`);
      }
      return [
        this.minecraft.broadcastHeadedEmbed({
          message: `${user} ${messages.joinMessage}`,
          title: `Member Joined`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 2067276,
          channel: "Logger",
        }),
        this.minecraft.broadcastHeadedEmbed({
          message: `${user} ${messages.joinMessage}`,
          title: `Member Joined`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 2067276,
          channel: "Guild",
        }),
      ];
    }

    if (this.isLeaveMessage(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[0];

      return [
        this.minecraft.broadcastHeadedEmbed({
          message: `${user} ${messages.leaveMessage}`,
          title: `Member Left`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 15548997,
          channel: "Logger",
        }),
        this.minecraft.broadcastHeadedEmbed({
          message: `${user} ${messages.leaveMessage}`,
          title: `Member Left`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 15548997,
          channel: "Guild",
        }),
      ];
    }

    if (this.isKickMessage(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[0];

      return [
        this.minecraft.broadcastHeadedEmbed({
          message: `${user} ${messages.kickMessage}`,
          title: `Member Kicked`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 15548997,
          channel: "Logger",
        }),
        this.minecraft.broadcastHeadedEmbed({
          message: `${user} ${messages.kickMessage}`,
          title: `Member Kicked`,
          icon: `https://mc-heads.net/avatar/${user}`,
          color: 15548997,
          channel: "Guild",
        }),
      ];
    }

    if (this.isPromotionMessage(message)) {
      const username = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[0];
      const newRank = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(" to ")
        .pop()
        .trim();
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${username} ${messages.promotionMessage} ${newRank}`,
          color: 2067276,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${username} ${messages.promotionMessage} ${newRank}`,
          color: 2067276,
          channel: "Logger",
        }),
      ];
    }

    if (this.isDemotionMessage(message)) {
      const username = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[0];
      const newRank = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(" to ")
        .pop()
        .trim();
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${username} ${messages.demotionMessage} ${newRank}`,
          color: 15548997,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${username} ${messages.demotionMessage} ${newRank}`,
          color: 15548997,
          channel: "Logger",
        }),
      ];
    }

    if (this.isCannotMuteMoreThanOneMonth(message)) {
      return this.minecraft.broadcastCleanEmbed({
        message: `${messages.cannotMuteMoreThanOneMonthMessage}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isBlockedMessage(message)) {
      const blockedMsg = message.match(/".+"/g)[0].slice(1, -1);
      return this.minecraft.broadcastCleanEmbed({
        message: `${messages.blockedMessageFirst} ${blockedMsg} ${messages.blockedMessageSecond}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isRepeatMessage(message)) {
      return client.channels.cache.get(bridgeChat).send({
        embeds: [
          {
            color: 15548997,
            description: `${messages.repeatMessage}`,
          },
        ],
      });
    }

    if (this.isNoPermission(message)) {
      return this.minecraft.broadcastCleanEmbed({
        message: `${messages.noPermissionMessage}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isIncorrectUsage(message)) {
      return this.minecraft.broadcastCleanEmbed({
        message: message.split("'").join("`"),
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isAlreadyBlacklistedMessage(message)) {
      return this.minecraft.broadcastHeadedEmbed({
        message: `${messages.alreadyBlacklistedMessage}`,
        title: `Blacklist`,
        color: 2067276,
        channel: "Logger",
      });
    }

    if (this.isBlacklistMessage(message)) {
      const user = message.split(" ")[1];
      return [
        this.minecraft.broadcastHeadedEmbed({
          message: `${user}${messages.blacklistMessage}`,
          title: `Blacklist`,
          color: 2067276,
          channel: "Logger",
        }),
      ];
    }

    if (this.isBlacklistRemovedMessage(message)) {
      const user = message.split(" ")[1];
      return [
        this.minecraft.broadcastHeadedEmbed({
          message: `${user}${messages.blacklistRemoveMessage}`,
          title: `Blacklist`,
          color: 2067276,
          channel: "Logger",
        }),
      ];
    }

    if (this.isOnlineInvite(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[2];
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.onlineInvite}`,
          color: 2067276,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.onlineInvite}`,
          color: 2067276,
          channel: "Logger",
        }),
      ];
    }

    if (this.isOfflineInvite(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[6]
        .match(/\w+/g)[0];
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.offlineInvite}`,
          color: 2067276,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.offlineInvite}`,
          color: 2067276,
          channel: "Logger",
        }),
      ];
    }

    if (this.isFailedInvite(message)) {
      return [
        this.minecraft.broadcastCleanEmbed({
          message: message.replace(/\[(.*?)\]/g, "").trim(),
          color: 15548997,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: message.replace(/\[(.*?)\]/g, "").trim(),
          color: 15548997,
          channel: "Logger",
        }),
      ];
    }

    if (this.isGuildMuteMessage(message)) {
      const time = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[7];
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${messages.guildMuteMessage} ${time}`,
          color: 15548997,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${messages.guildMuteMessage} ${time}`,
          color: 15548997,
          channel: "Logger",
        }),
      ];
    }

    if (this.isGuildUnmuteMessage(message)) {
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${messages.guildUnmuteMessage}`,
          color: 2067276,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${messages.guildUnmuteMessage}`,
          color: 2067276,
          channel: "Logger",
        }),
      ];
    }

    if (this.isUserMuteMessage(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[3]
        .replace(/[^\w]+/g, "");
      const time = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[5];
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.userMuteMessage} ${time}`,
          color: 15548997,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.userMuteMessage} ${time}`,
          color: 15548997,
          channel: "Logger",
        }),
      ];
    }

    if (this.isUserUnmuteMessage(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(/ +/g)[3];
      return [
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.userUnmuteMessage}`,
          color: 2067276,
          channel: "Guild",
        }),
        this.minecraft.broadcastCleanEmbed({
          message: `${user} ${messages.userUnmuteMessage}`,
          color: 2067276,
          channel: "Logger",
        }),
      ];
    }

    if (this.isSetrankFail(message)) {
      return this.minecraft.broadcastCleanEmbed({
        message: `${messages.setrankFailMessage}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isGuildQuestCompletion(message)) {
      this.minecraft.broadcastHeadedEmbed({
        title: "Guild Quest Completion",
        icon: `https://hypixel.paniek.de/guild/${config.minecraft.guild.id}/banner.png`,
        message: `${message}`,
        color: 15844367,
        channel: "Guild",
      });
    }

    if (this.isAlreadyMuted(message)) {
      return this.minecraft.broadcastCleanEmbed({
        message: `${messages.alreadyMutedMessage}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isNotInGuild(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(" ")[0];
      return this.minecraft.broadcastCleanEmbed({
        message: `${user} ${messages.notInGuildMessage}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isLowestRank(message)) {
      const user = message
        .replace(/\[(.*?)\]/g, "")
        .trim()
        .split(" ")[0];
      return this.minecraft.broadcastCleanEmbed({
        message: `${user} ${messages.lowestRankMessage}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isAlreadyHasRank(message)) {
      return this.minecraft.broadcastCleanEmbed({
        message: `${messages.alreadyHasRankMessage}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    if (this.isTooFast(message)) {
      return logger.warnMessage(message);
    }

    if (this.isPlayerNotFound(message)) {
      const user = message.split(" ")[8].slice(1, -1);
      return this.minecraft.broadcastCleanEmbed({
        message: `${messages.playerNotFoundMessageFirst} ${user} ${messages.playerNotFoundMessageSecond}`,
        color: 15548997,
        channel: "Guild",
      });
    }

    /*if (this.isPartyMessage(message)) {
      this.minecraft.broadcastCleanEmbed({ 
        message: `${message}`, 
        color: 15548997, 
        channel: 'Guild' 
      })  
    }*/

    if (config.console.debug) {
      this.minecraft.broadcastMessage({
        fullMessage: colouredMessage,
        message: "debug_temp_message_ignore",
        chat: "debugChannel",
      });
    }

    const parts = message.split(":");
    const group = parts.shift().trim();
    const hasRank = group.endsWith("]");
    const chat = message.split(">");
    const chatType = chat.shift().trim();
    const userParts = group.split(" ");
    const username = userParts[userParts.length - (hasRank ? 2 : 1)];
    let guildRank = userParts[userParts.length - 1]
      .replace("[", "")
      .replace("]", "");
    const playerMessage = parts.join(":").trim();

    if (!this.isGuildMessage(message) && !this.isOfficerChatMessage(message)) {
      return;
    }
    if (guildRank == username) guildRank = "Member";
    if (this.isMessageFromBot(username)) return;
    if (
      playerMessage.length == 0 ||
      this.command.handle(username, playerMessage)
    ) {
      return;
    }
    if (playerMessage == "@") return;

    this.minecraft.broadcastMessage({
      fullMessage: colouredMessage,
      username: username,
      message: playerMessage
        .replaceAll("@everyone", "")
        .replaceAll("@here", ""),
      guildRank: guildRank,
      chat: chatType,
    });
  }

  isMessageFromBot(username) {
    return bot.username === username;
  }

  isAlreadyBlacklistedMessage(message) {
    return (
      message.includes(
        `You've already ignored that player! /ignore remove Player to unignore them!`
      ) && !message.includes(":")
    );
  }
  isBlacklistRemovedMessage(message) {
    return (
      message.startsWith("Removed") &&
      message.includes("from your ignore list.") &&
      !message.includes(":")
    );
  }

  isBlacklistMessage(message) {
    return (
      message.startsWith("Added") &&
      message.includes("to your ignore list.") &&
      !message.includes(":")
    );
  }

  isGuildMessage(message) {
    return message.startsWith("Guild >") && message.includes(":");
  }

  isOfficerChatMessage(message) {
    return message.startsWith("Officer >") && message.includes(":");
  }

  isGuildQuestCompletion(message) {
    return (
      message.includes("GUILD QUEST TIER ") &&
      message.includes("COMPLETED") &&
      !message.includes(":")
    );
  }

  isLoginMessage(message) {
    return (
      message.startsWith("Guild >") &&
      message.endsWith("joined.") &&
      !message.includes(":")
    );
  }

  isLogoutMessage(message) {
    return (
      message.startsWith("Guild >") &&
      message.endsWith("left.") &&
      !message.includes(":")
    );
  }

  isJoinMessage(message) {
    return message.includes("joined the guild!") && !message.includes(":");
  }

  isLeaveMessage(message) {
    return message.includes("left the guild!") && !message.includes(":");
  }

  isKickMessage(message) {
    return (
      message.includes("was kicked from the guild by") && !message.includes(":")
    );
  }

  isGuildTopMessage(message) {
    return (
      message.includes("Guild Experience") &&
      !message.includes("???") &&
      !message.includes(":")
    );
  }
  isPartyMessage(message) {
    return (
      message.includes("has invited you to join their party!") &&
      !message.includes(":")
    );
  }

  isGuildListMessage(message) {
    return (
      message.includes("???") ||
      (message.includes(" -- ") && message.includes(" -- ")) ||
      message.startsWith("Online Members: ") ||
      message.includes("Online Members: ") ||
      message.startsWith("Total Members:") ||
      message.startsWith("Guild Name:")
    );
  }

  isPromotionMessage(message) {
    return message.includes("was promoted from") && !message.includes(":");
  }

  isDemotionMessage(message) {
    return message.includes("was demoted from") && !message.includes(":");
  }

  isRequestMessage(message) {
    return message.includes("has requested to join the Guild!");
  }

  isBlockedMessage(message) {
    return (
      message.includes("We blocked your comment") && !message.includes(":")
    );
  }

  isRepeatMessage(message) {
    return message == "You cannot say the same message twice!";
  }

  isNoPermission(message) {
    return (
      (message.includes("You must be the Guild Master to use that command!") ||
        message.includes("You do not have permission to use this command!") ||
        message.includes(
          "I'm sorry, but you do not have permission to perform this command. Please contact the server administrators if you believe that this is in error."
        ) ||
        message.includes(
          "You cannot mute a guild member with a higher guild rank!"
        ) ||
        message.includes("You cannot kick this player!") ||
        message.includes("You can only promote up to your own rank!") ||
        message.includes("You cannot mute yourself from the guild!") ||
        message.includes("is the guild master so can't be demoted!") ||
        message.includes(
          "is the guild master so can't be promoted anymore!"
        )) &&
      !message.includes(":")
    );
  }

  isIncorrectUsage(message) {
    return message.includes("Invalid usage!") && !message.includes(":");
  }

  isOnlineInvite(message) {
    return (
      message.includes("You invited") &&
      message.includes("to your guild. They have 5 minutes to accept.") &&
      !message.includes(":")
    );
  }

  isOfflineInvite(message) {
    return (
      message.includes("You sent an offline invite to") &&
      message.includes(
        "They will have 5 minutes to accept once they come online!"
      ) &&
      !message.includes(":")
    );
  }

  isFailedInvite(message) {
    return (
      (message.includes("is already in another guild!") ||
        message.includes("You cannot invite this player to your guild!") ||
        (message.includes("You've already invited") &&
          message.includes("to your guild! Wait for them to accept!")) ||
        message.includes("is already in your guild!")) &&
      !message.includes(":")
    );
  }

  isUserMuteMessage(message) {
    return (
      message.includes("has muted") &&
      message.includes("for") &&
      !message.includes(":")
    );
  }

  isUserUnmuteMessage(message) {
    return message.includes("has unmuted") && !message.includes(":");
  }

  isCannotMuteMoreThanOneMonth(message) {
    return (
      message.includes("You cannot mute someone for more than one month") &&
      !message.includes(":")
    );
  }

  isGuildMuteMessage(message) {
    return (
      message.includes("has muted the guild chat for") && !message.includes(":")
    );
  }

  isGuildUnmuteMessage(message) {
    return (
      message.includes("has unmuted the guild chat!") && !message.includes(":")
    );
  }

  isSetrankFail(message) {
    return (
      message.includes("I couldn't find a rank by the name of ") &&
      !message.includes(":")
    );
  }

  isAlreadyMuted(message) {
    return (
      message.includes("This player is already muted!") &&
      !message.includes(":")
    );
  }

  isNotInGuild(message) {
    return message.includes(" is not in your guild!") && !message.includes(":");
  }

  isLowestRank(message) {
    return (
      message.includes("is already the lowest rank you've created!") &&
      !message.includes(":")
    );
  }

  isAlreadyHasRank(message) {
    return (
      message.includes("They already have that rank!") && !message.includes(":")
    );
  }

  isLobbyJoinMessage(message) {
    return (
      (message.endsWith(" the lobby!") ||
        message.endsWith(" the lobby! <<<")) &&
      message.includes("[MVP+")
    );
  }

  isTooFast(message) {
    return (
      message.includes(
        "You are sending commands too fast! Please slow down."
      ) && !message.includes(":")
    );
  }

  isPlayerNotFound(message) {
    return message.startsWith(`Can't find a player by the name of`);
  }
}

module.exports = StateHandler;
