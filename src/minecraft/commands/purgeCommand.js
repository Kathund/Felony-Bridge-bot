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
            if (username == "hitlastBESTWW") {
                this.send(`/gc Good bye felony`)
                var keep = ["burekxs", "snowyhitlast", "felonybot", "festivezom", "4vl", "snowyhyenda", "snowyhyenda", "reqlity", "snowykath", "tryinhard", "xstxppxd", "hitlastbestww", "_aricow", "x710", "clevevl", "vquv", "festivemosu", "sqwif", "merryradicalad", "sweathy", "sugna_", "lighthth", "1vz_", "axth", "tryinsoft", "snowytrios", "bloood", "yunoh_", "pixelic", "yoderofgaming", "obigtiger", "firedmountain", "feelingsx", "cgtv32", "sqsm", "caitgx", "heembreezy", "merryfoamy", "shadowlm", "baienciaga", "valmah", "qseu", "zeacch", "merryastro", "burntt0ast_", "lxgg", "spookyheroo", "gothmommylaine", "scammedlmao", "snowyqitz", "bedwars4v4", "mol_o", "waeaejwalwaekdja", "lufh", "2kfk", "kelnis", "valainey", "burnzysuwukitten", "ohnoah_", "hitlastbestww", "hitlast1234", "juicewrd", "griffmas", "essam_a_jr"]
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
                        kicked = kicked + 1
                        this.minecraft.bot.chat(`/g kick ${player.nickname} Thank you for being a part of Felony but we are going private <3`)
                        await delay(3000)
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