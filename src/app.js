/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import 'dotenv/config'
import Discord from 'discord.js'
import fs from 'fs'
import { join } from 'path'

class App {
  constructor() {
    this.client = new Discord.Client()

    this.authenticate()
    this.events()
    this.commands()
  }

  authenticate() {
    this.client.login()

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`)
    })
  }

  events() {
    const eventsFiles = fs
      .readdirSync('src/app/events')
      .filter((file) => file.endsWith('.js'))

    eventsFiles.forEach((event) => event.init(this.client))
  }

  commands() {
    this.client.commands = new Discord.Collection()

    const commandFiles = fs
      .readdirSync('src/app/commands')
      .filter((file) => file.endsWith('.js'))

    commandFiles.forEach((file) => {
      const command = require(join(__dirname, 'app/commands', file))
      this.client.commands.set(command.name, command)
    })
  }
}

export default new App()
