const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")

class PurgeCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "fuckoff";
        this.aliases = [""];
        this.description = "PURGE";
        this.options = [];
        this.optionsDescription = [];
    }

    async onCommand(username, message) {
        try {
            const check = await hypixel.getGuild(`player`, username)
            if (check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
                this.send(`/gc Good bye felony`)
                var keep = ["burekxs", "festivezom", "felonybot", "beonji", "snowyhitlast", "xstxppxd", "snowykath", "snowyhyenda", "pixelic", "reqlity", "hitlast1234", "tryinhard", "hitlastbestww", "king_noobs", "hitlast0001", "xwichniar123", "vquv", "clevevl", "qsue", "mol_o", "baienciaga", "burntt0ast_", "essam_a_jr"]
                const check = await hypixel.getGuild('name', config.minecraft.guild.name);
                var members = check.members;
                var guildMembers = [];
                for (const member in members) {
                    guildMembers.push(members[member].uuid)
                }
                var f = guildMembers.entries();
                let num = 0
                let kicked = 0
                await delay(10000)
                this.send(`/oc Checking ${guildMembers.length} members`)
                await delay(2000)
                for (let x of f) {
                    var i = guildMembers[num]
                    var player = await hypixel.getPlayer(i)
                    var ignLower = player.nickname.toLowerCase()
                    if (keep.includes(ignLower)) {
                        this.send(`/oc ${player.nickname} is in the keep list`)
                        await delay(3000)
                    } else {
                        let staying = false

                        let meetRequirements = false;
                        let hasBWStars = false;
                        let hasBWFKDR = false;
                        let hasDuelsWins = false;
                        let hasDuelsWLR = false;

                        const hypixelLevel = player.level;
                        const bwStars = player.stats.bedwars.level;
                        const bwFKDR = player.stats.bedwars.finalKDRatio;
                        const bwWins = player.stats.bedwars.wins;
                        const swWins = player.stats.skywars.wins;
                        const duelsWins = player.stats.duels.wins;
                        const duelsWLR = player.stats.duels.WLRatio;

                        if (
                            hypixelLevel > config.minecraft.guild.requirements.hypixelNetworkLevel
                        ) {
                            meetRequirements = true
                        }
                        if (bwStars > config.minecraft.guild.requirements.bedwarsStars) {
                            hasBWStars = true;
                        }
                        if (bwFKDR > config.minecraft.guild.requirements.bedwarsFKDR) {
                            hasBWFKDR = true;
                        }
                        if (hasBWStars == true && hasBWFKDR == true) meetRequirements = true;
                        if (bwWins > config.minecraft.guild.requirements.bedwarsWins) {
                            meetRequirements = true
                        }
                        if (swWins > config.minecraft.guild.requirements.skywarsWins) {
                            meetRequirements = true
                        }
                        if (duelsWins > config.minecraft.guild.requirements.dulesWins) {
                            hasDuelsWins = true;
                        }
                        if (duelsWLR > config.minecraft.guild.requirements.duelsWLR) {
                            hasDuelsWLR = true;
                        }
                        if (hasDuelsWins == true && hasDuelsWLR == true) {
                            meetRequirements = true;
                        }

                        if (meetRequirements == true) { staying = true }
                        if (staying == false) {
                            var guild = await hypixel.getGuild("player", player.nickname);
                            if (guild.me.weeklyExperience >= config.minecraft.guild.ranks.prisoners.weeklyExperience) {
                                staying = true
                            }
                        }

                        if (staying == true) {
                            this.send(`/oc ${player.nickname} is staying`)
                            await delay(3000)
                        } else {
                            this.send(`/oc ${player.nickname} is being kicked`)
                            await delay(3000)
                            kicked = kicked + 1
                            this.minecraft.bot.chat(`/g kick ${player.nickname} Thank you for being a part of Felony but we are going private <3`)
                            await delay(3000)
                        }
                    }
                    num = num + 1
                    x = x + 1
                }
                this.send(`/go Finsihed members ${kicked}`)
            } else {
                this.send(`/gc Staff only command`);
            }
        } catch (error) {
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = PurgeCommand;