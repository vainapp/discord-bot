import { MessageEmbed } from 'discord.js'
import { prefix } from '../../config/prefix'

class MessageEvent {
  init(client) {
    client.on('message', async (message) => {
      if (!message.content.startsWith(prefix) || message.author.bot) return

      const args = message.content.slice(prefix.length).trim().split(/ +/)
      const commandName = args.shift().toLowerCase()

      if (!client.commands.has(commandName)) {
        message.react('⚠️')
        message.reply('comando não encontrado!')
        return
      }

      try {
        await client.commands.get(commandName).execute(message, args)
      } catch (error) {
        if (error.name === 'DiscordAPIError') {
          const embed = new MessageEmbed()
            .setTitle('Houve um erro ao tentar executar este comando!')
            .setColor('#7159c1')
            .setDescription(error.message)

          message.channel.send(embed)
        } else {
          console.error(error)
          message.reply('houve um erro ao tentar executar este comando!')
        }

        message.react('⚠️')
        return
      }

      message.react('✅')
    })
  }
}

export default new MessageEvent()
