const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const hypixel = require("../../contracts/API/HypixelRebornAPI.js");
const config = require("../../../config.json")


class SetRankCommand extends minecraftCommand {
    constructor(minecraft) {
        super(minecraft);

        this.name = "setrank";
        this.aliases = [""];
        this.description = "set everyones rank";
        this.options = [];
        this.optionsDescription = [];
    }

    async onCommand(username, message) {
        try {
            const check = await hypixel.getGuild(`player`, username)
            if (check.me.rank == "Police" || check.me.rank == "Wardens" || check.me.rank == "Guild Master") {
                const arg = this.getArgs(message);
                let rank = 'prisoners'
                if (arg[0]) rank = arg[0]
                if (rank == 'Police' || rank == 'Wardens' || rank == 'Guild Master') {
                    this.send(`/go You Can't set everyones rank to a staff rank!`)
                } else {
                    this.send(`/go Setting everyones rank that isn't staff to ${rank}`)
                    await delay(1000)
                    const check = await hypixel.getGuild('name', config.minecraft.guild.name);
                    var members = check.members;
                    var guildMembers = [];
                    for (const member in members) {
                        guildMembers.push(members[member].uuid)
                    }
                    var f = guildMembers.entries();
                    let num = 0
                    this.send(`/oc Checking ${guildMembers.length} members and then setting ranks`)
                    await delay(2000)
                    for (let x of f) {
                        var i = guildMembers[num]
                        var player = await hypixel.getPlayer(i)
                        var guild = await hypixel.getGuild('player', i)
                        if (guild.me.rank == "Police" || guild.me.rank == "Wardens" || guild.me.rank == "Guild Master") {
                            this.send(`/oc ${player.nickname} is a staff member and I won't update there rank`)
                        } else {
                            this.minecraft.bot.chat(`/g setrank ${player.nickname} ${rank}`)
                            await delay(500)
                            this.send(`/go Updated ${player.nickanme} and set there rank to ${rank}`)
                            await delay(5000)
                        }
                        num = num + 1
                        x = x + 1
                    }
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

module.exports = SetRankCommand;