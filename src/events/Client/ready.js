const { Events } = require("discord.js");
const { log } = require("../../functions");

module.exports = {
  name: Events.ClientReady,
  once: true,

  run: (client) => {
    log(`Ready! Logged in as ${client.user.tag}`);
  },
};
