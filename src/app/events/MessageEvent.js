import { prefix } from '../../config/prefix'

class MessageEvent {
  init(client) {
    client.on('messageCreate', async (message) => {
      if (!message.content.startsWith(prefix) || message.author.bot) return

      const args = message.content.slice(prefix.length).trim().split(/ +/)
      const commandName = args.shift().toLowerCase()

      if (!client.commands.has(commandName)) {
        message.react('⚠️')
        message.reply('Comando não encontrado!')
        return
      }

      try {
        await client.commands.get(commandName).execute(message, args)
      } catch (error) {
        console.error(error)
        message.react('⚠️')
        message.reply('Houve um erro ao tentar executar este comando!')
        return
      }

      message.react('✅')
    })
  }
}

export default new MessageEvent()
