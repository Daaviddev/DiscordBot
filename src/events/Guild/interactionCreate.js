const config = require('../../config');
const { log } = require('../../functions');

module.exports = {
  event: 'interactionCreate',

  run: async (client, interaction) => {
    console.log('interactionCreate', interaction.customId);

    // Handle slash command interactions
    if (interaction.isCommand() && isValidCommandType(interaction)) {
      executeCommand(client, interaction);
    }
  },
};

function executeCommand(client, interaction) {
  const command = client.collection.interactioncommands.get(
    interaction.commandName
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return interaction.reply('Command not found.');
  }

  try {
    command.run(client, interaction);
  } catch (error) {
    log(error, 'error');
    interaction.reply('An error occurred while executing the command.');
  }
}

function isValidCommandType(interaction) {
  return (
    (interaction.isChatInputCommand() && config.handler.commands.slash) ||
    (interaction.isUserContextMenuCommand() && config.handler.commands.user) ||
    (interaction.isMessageContextMenuCommand() &&
      config.handler.commands.message)
  );
}
