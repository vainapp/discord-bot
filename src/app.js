import 'dotenv/config';
import Discord from 'discord.js';
import fs from 'fs';
import { join } from 'path';

import ServerGreetingEvent from './app/events/ServerGreetingEvent';
import MessageEvent from './app/events/MessageEvent';

class App {
  constructor() {
    this.client = new Discord.Client();

    this.authenticate();
    this.events();
    this.commands();
  }

  authenticate() {
    this.client.login();

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
  }

  events() {
    const events = [ServerGreetingEvent, MessageEvent];

    events.forEach((event) => event.init(this.client));
  }

  commands() {
    this.client.commands = new Discord.Collection();

    const commandFiles = fs
      .readdirSync('src/app/commands')
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const { default: command } = require(join(
        __dirname,
        './app/commands',
        file
      ));
      this.client.commands.set(command.name, command);
    }
  }
}

export default new App();
