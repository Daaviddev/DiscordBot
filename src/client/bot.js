const {
  Client,
  Partials,
  Collection,
  GatewayIntentBits,
} = require('discord.js');
const config = require('../config');
const commands = require('../handlers/commands');
const events = require('../handlers/events');
const deploy = require('../handlers/deploy');
const components = require('../handlers/baseInteractions');
module.exports = class extends Client {
  collection = {
    interactioncommands: new Collection(),
    aliases: new Collection(),
    components: {
      buttons: new Collection(),
      selects: new Collection(),
      modals: new Collection(),
    },
    dynamicComponents: {
      buttons: new Collection(),
      selects: new Collection(),
      modals: new Collection(),
    },
  };
  applicationcommandsArray = [];

  constructor() {
    super({
      intents: [Object.keys(GatewayIntentBits)],
      partials: [Object.keys(Partials)],
      presence: {
        activities: [
          {
            name: 'something goes here',
            type: 4,
            state: 'DiscordBot',
          },
        ],
      },
    });
  }

  start = async () => {
    commands(this);
    events(this);
    components(this);

    await this.login(process.env.CLIENT_TOKEN || config.client.token);

    if (config.handler.deploy) deploy(this, config);
  };
};
