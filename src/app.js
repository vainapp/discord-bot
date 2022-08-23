/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import 'dotenv/config'
import { Client, Collection, IntentsBitField } from 'discord.js'
import fs from 'fs'
import { join } from 'path'

import MessageEvent from './app/events/MessageEvent'
import ServerGreetingEvent from './app/events/ServerGreetingEvent'

class App {
  constructor() {
    this.client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    })

    this.authenticate()
    this.events()
    this.commands()
  }

  authenticate() {
    this.client.login(process.env.DISCORD_TOKEN)

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`)
    })
  }

  events() {
    const events = [MessageEvent, ServerGreetingEvent]
    events.forEach((event) => event.init(this.client))
  }

  commands() {
    this.client.commands = new Collection()

    const commandFiles = fs
      .readdirSync('src/app/commands')
      .filter((file) => file.endsWith('.js'))

    commandFiles.forEach((file) => {
      const command = require(join(__dirname, 'app/commands', file))
      this.client.commands.set(command.default.name, command.default)
    })
  }
}

export default new App()
