const { Client, Message } = require("discord.js");

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    // Define the prefix for commands
    const prefix = "!"; // Example prefix, adjust as needed

    // Ignore messages from bots and messages that do not start with the prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Split the message into command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Retrieve the command from the bot's command collection
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    // If the command does not exist, exit
    if (!command) return;

    try {
      // Execute the command
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      await message.reply({
        content: "There was an error executing that command.",
        ephemeral: true,
      });
    }
  },
};
