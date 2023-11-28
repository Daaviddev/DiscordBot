const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('new_trade_setup')
    .setDescription('Initiates a new trade'),

  run: async (_client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('New Trade Setup')
      .setDescription('Click the button below to post your trade.');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('postTrade')
        .setLabel('Post Trade')
        .setStyle(1)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
