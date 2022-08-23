export default {
  name: 'help',
  description: 'Lista todos os comandos disponíveis',
  async execute(message) {
    return message.reply('Comando de ajuda!')
  },
}
