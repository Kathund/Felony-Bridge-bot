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
                this.send(`/g kick GreenSheep1234 Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick Eloid Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick Retimo Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick lufh Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick SpookySpizzard Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick ii_Chunk Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick xSpaceX Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick vSyphex Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick ethuhn Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick 67ig Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick DissTrack Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick LilUziVrt Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick VALMAHSLILKITTY Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
                await delay(500)
                this.send(`/g kick gixd Inactive - If you wish to come back do /g join felony and if you have the reqs it will accept or apply in the discord - gg/felony`);
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