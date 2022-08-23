class ServerGreetingEvent {
  init(client) {
    client.on('guildMemberAdd', (member) => {
      const channel = member.guild.channels.cache.find(
        (ch) => ch.name === 'welcome'
      )

      if (!channel) return

      channel.send(`Seja bem-vindo(a), ${member}!`)
    })
  }
}

export default new ServerGreetingEvent()
