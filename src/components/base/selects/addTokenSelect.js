const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = function addTokenSelect(tokens) {
  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('add_token_select') // Set a meaningful custom ID
      .setPlaceholder('Select a token')
      .addOptions(tokens)
  );
  return row;
};
