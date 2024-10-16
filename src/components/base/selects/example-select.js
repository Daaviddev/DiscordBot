const { StringSelectMenuInteraction } = require('discord.js');

module.exports = {
  customId: 'example-select',

  run: async (client, interaction) => {
    const value = interaction.values[0];

    await interaction.reply({
      content: `You have selected from the menu: **${value}**`,
      ephemeral: true,
    });
  },
};
