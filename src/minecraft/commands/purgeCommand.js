const minecraftCommand = require("../../contracts/minecraftCommand.js");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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
            if (username == 'Udderly_cool') {
                this.send(`/gc ITS TIME BITCHES ITS THE PERGE`)
                await delay(1000)
                this.send(`/g kick alfontop Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick rqpper Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick ihoopje Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick dyschezia Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick Spookyl1ght Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick pe1t Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick ssphex Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick _lerts Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick abglaine Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick siszeus Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick orqzor Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick gothgirle Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/gc The purge is done!`)
            }
            else {
                this.send(`/gc no`);
            }
        } catch (error) {
            console.log(error);
            this.send(
                "/gc There is no player with the given UUID or name or the player has no Skyblock profiles"
            );
        }
    }
}

module.exports = PurgeCommand;