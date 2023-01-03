const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const { logError } = require("../../contracts/helperFunctions.js")
const config = require("../../../config.json")

class PurgeCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "fuckoff";
        this.aliases = [];
        this.description = "PURGE";
        this.options = [];
        this.optionsDescription = [];
    }

    async onCommand(username, message) {
        let playerIGN = username
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
                        let staying = false;
                        let meetRequirements = false;

                        const bwWins = player.stats.bedwars.wins;
                        const swWins = player.stats.skywars.wins;
                        const duelsWins = player.stats.duels.wins;

                        if (
                            bwWins >= config.minecraft.guild.requirements.bedwarsWins
                        ) {
                            meetRequirements = true
                        }
                        if (
                            swWins >= config.minecraft.guild.requirements.skywarsWins
                        ) {
                            meetRequirements = true
                        }
                        if (
                            duelsWins >= config.minecraft.guild.requirements.duelsWins
                        ) {
                            meetRequirements = true
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
            await logError(playerIGN, error);
            console.log(error);
            this.send("/gc Something went wrong..");
        }
    }
}

module.exports = PurgeCommand;