const MinecraftCommand = require('../../contracts/MinecraftCommand')

class HelpCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'help'
    this.aliases = ['h']
    this.description = 'Help'
  }

  onCommand(username, message) {
    this.send(`/gc ${username} ping pong fucker`)
  }
}

module.exports = HelpCommand
