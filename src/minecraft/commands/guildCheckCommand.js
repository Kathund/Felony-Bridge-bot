const minecraftCommand = require("../../contracts/minecraftCommand.js");
const { logError } = require("../../contracts/helperFunctions.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")

class GEXPRankCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "guildcheck";
        this.aliases = ["gcheck"];
        this.description = "j";
        this.options = [];
    }

    async onCommand(username, message) {
        var playerIGN = username
        try {
            const check = await hypixel.getGuild(`player`, username)
            const arg = this.getArgs(message);
            if (check.me.rank == "Police" || check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
                if (arg[0]) {
                    let ign = arg[0];
                    if (ign == "all") {
                        if (check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
                            var guild = await hypixel.getGuild('name', config.minecraft.guild.name);
                            var members = guild.members;
                            var guildMembers = [];
                            for (const member in members) {
                                guildMembers.push(members[member].uuid)
                            }
                            var f = guildMembers.entries();
                            let num = 0
                            this.send(`/oc Checking ${guildMembers.length} members`)
                            await delay(2000)
                            for (let x of f) {
                                var i = guildMembers[num]
                                var player = await hypixel.getPlayer(i)
                                var playerGuild = await hypixel.getGuild('player', i)
                                if (playerGuild.me.rank == "Police" || playerGuild.me.rank == "Wardens" || playerGuild.me.rank == "Guild Master") {
                                    this.send(`/oc ${player.nickname} is a staff member`)
                                } else {
                                    const weekGEXP = playerGuild.me.weeklyExperience
                                    if (weekGEXP > config.minecraft.guild.ranks.guards) {
                                        this.send(`/go ${player.nickname} is now Guards`)
                                        await delay(3000)
                                        this.minecraft.bot.chat(`/g setrank ${player.nickname} Guards`)
                                    } else if (weekGEXP > config.minecraft.guild.ranks.thieves) {
                                        this.send(`/go ${player.nickname} is now Thieves`)
                                        await delay(3000)
                                        this.minecraft.bot.chat(`/g setrank ${player.nickname} Thieves`)
                                    } else if (weekGEXP > config.minecraft.guild.ranks.prisoners) {
                                        this.send(`/go ${player.nickname} is now Prisoners`)
                                        await delay(3000)
                                        this.minecraft.bot.chat(`/g setrank ${player.nickname} Prisoners`)
                                    } else {
                                        if (config.minecraft.guild.kicking == false) {
                                            this.send(`/oc ${player.nickname} dose not have the 50k gxp - Kicking is disabled`)
                                            await delay(3000)
                                            this.minecraft.bot.chat(`/g setrank ${player.nickname} Prisoners`)
                                        } else {
                                            this.send(`/oc ${player.nickname} dose not have the 50k gxp - Kicking`)
                                            await delay(3000)
                                            this.send(`/g kick ${player.nickname} Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
                                        }
                                    }
                                }
                                num = num + 1
                                x = x + 1
                            }
                            this.send(`/oc Done`)
                        } else { this.send(`/gc This is admin only`) }
                    } else {
                        const guild = await hypixel.getGuild('player', ign);
                        if (guild.me.rank == "Police" || guild.me.rank == "Wardens" || guild.me.rank == "Guild Master") {
                            this.send(`/gc ${ign} is a staff member`)
                        } else {
                            const weekGEXP = guild.me.weeklyExperience
                            if (weekGEXP > config.minecraft.guild.ranks.guards) {
                                this.send(`/gc ${ign} is now Guards`)
                                await delay(1000)
                                this.minecraft.bot.chat(`/g setrank ${ign} Guards`)
                            } else if (weekGEXP > config.minecraft.guild.ranks.thieves) {
                                this.send(`/gc ${ign} is now Thieves`)
                                await delay(1000)
                                this.minecraft.bot.chat(`/g setrank ${ign} Thieves`)
                            } else if (weekGEXP > config.minecraft.guild.ranks.prisoners) {
                                this.send(`/gc ${ign} is now Prisoners`)
                                await delay(1000)
                                this.minecraft.bot.chat(`/g setrank ${ign} Prisoners`)
                            } else {
                                this.send(`/go ${ign} dose not have the 50k gxp`)
                                await delay(1000)
                                if (config.minecraft.guild.kicking == false) {
                                    this.send(`/oc Kicking is disabled`)
                                    await delay(1000)
                                    this.minecraft.bot.chat(`/g setrank ${ign} Prisoners`)
                                } else {
                                    this.send(`/g kick ${ign} Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
                                }
                            }
                        }
                    }
                } else {
                    this.send(`/gc You need to specify a player`)
                }
            } else {
                this.send(`/gc This is a staff only command`)
            }
        } catch (error) {
            await logError(playerIGN, error, this.name, message);
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = GEXPRankCommand;
