const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")

class PurgeCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "purge";
        this.aliases = [""];
        this.description = "PURGE";
        this.options = [];
        this.optionsDescription = [];
    }

    async onCommand(username, message) {
        try {
            const check = await hypixel.getGuild(`player`, username)
            if (check.me.rank == "Police" || check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
                let amount = config.minecraft.guild.ranks.prisoners
                let max = 125
                const arg = this.getArgs(message);
                if (arg[0]) amount = arg[0]
                if (arg[1]) max = arg[1]
                this.send(`/go Purging anyone under the ${amount} gexp with the max amount ${max}`)
                await delay(1000)
                const check = await hypixel.getGuild('name', config.minecraft.guild.name);
                var members = check.members;
                var guildMembers = [];
                for (const member in members) {
                    guildMembers.push(members[member].uuid)
                }
                var f = guildMembers.entries();
                let num = 0
                let kicked = 0
                this.send(`/oc Checking ${guildMembers.length} members`)
                await delay(2000)
                for (let x of f) {
                    if (kicked >= max) {
                        this.send(`/oc Reached max amount of ${max} purged`)
                        break;
                    }
                    var i = guildMembers[num]
                    var player = await hypixel.getPlayer(i)
                    var guild = await hypixel.getGuild('player', i)
                    if (guild.me.rank == "Police" || guild.me.rank == "Wardens" || guild.me.rank == "Guild Master") {
                        this.send(`/oc ${player.nickname} is a staff member`)
                        await delay(3000)
                    } else {
                        const weekGEXP = guild.me.weeklyExperience
                        if (weekGEXP <= amount) {
                            this.send(`/g kick ${player.nickname} Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`)
                            kicked = kicked + 1
                            await delay(3000)
                        } else {
                            this.send(`/oc ${player.nickname} has more then ${amount} gexp`)
                            await delay(3000)
                        }
                    }
                    num = num + 1
                    x = x + 1
                }
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