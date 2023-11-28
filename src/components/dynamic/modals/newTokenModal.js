const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');
const {
  registerDynamicComponent,
} = require('../../../handlers/dynamicInteractions');

function createNewTokenModal(client) {
  // Register the dynamic modal handler
  registerDynamicComponent(client, 'handleNewTokenModal.js', 'modals');

  // Create the modal
  const modal = new ModalBuilder()
    .setCustomId('new_token_modal')
    .setTitle('New Token');
  const tokenNameInput = new TextInputBuilder()
    .setCustomId('tokenNameInput')
    .setLabel('Enter the name of the token')
    .setStyle(TextInputStyle.Short);
  const actionRow = new ActionRowBuilder().addComponents(tokenNameInput);
  modal.addComponents(actionRow);

  return modal;
}

module.exports = createNewTokenModal;
