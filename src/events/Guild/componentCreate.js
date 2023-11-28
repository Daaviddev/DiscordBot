const { log } = require('../../functions');

module.exports = {
  event: 'interactionCreate',

  run: async (client, interaction) => {
    // Handle button interactions
    if (interaction.isButton()) {
      handleCommandComponentInteraction(client, interaction, 'buttons');
    }

    // Handle select menu interactions
    if (interaction.isStringSelectMenu()) {
      handleCommandComponentInteraction(client, interaction, 'selects');
    }

    // Handle modal submit interactions
    if (interaction.isModalSubmit()) {
      handleCommandComponentInteraction(client, interaction, 'modals');
    }
  },
};

function handleCommandComponentInteraction(client, interaction, componentType) {
  const component =
    client.collection.dynamicComponents[componentType].get(
      interaction.customId
    ) || client.collection.components[componentType].get(interaction.customId);

  if (!component) {
    console.log('No component matching', interaction.customId, 'was found.');
    return;
  }

  try {
    component.run(client, interaction);
  } catch (error) {
    log(error, 'error');
    // Optionally, you can send a user-friendly error message
    interaction.reply('An error occurred while processing your interaction.');
  }
}

function handleModalInteraction(client, interaction) {
  switch (interaction.customId) {
    case 'new_token_modal':
      break;

    default:
      break;
  }
}
