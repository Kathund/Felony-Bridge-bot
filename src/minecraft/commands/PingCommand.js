const MinecraftCommand = require('../../contracts/MinecraftCommand')

class PingCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'ping'
    this.aliases = ['pong']
    this.description = 'Replies with `Pong!` to the user'
  }

  onCommand(username, message) {
    this.send(`/gc ${username} ping pong fucker`)
  }
}

module.exports = PingCommand
