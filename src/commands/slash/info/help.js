const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View all the possible commands!'),
  options: {
    cooldown: 15000,
  },

  run: async (client, interaction) => {
    await interaction.deferReply();

    const mapIntCmds = client.applicationcommandsArray.map(
      (v) =>
        `\`${v.type === 2 || v.type === 3 ? '' : '/'}${v.name}\`: ${
          v.description || '(No description)'
        }`
    );

    await interaction.followUp({
      embeds: [
        new EmbedBuilder().setTitle('Help command').addFields({
          name: 'Slash commands',
          value: `${mapIntCmds.join('\n')}`,
        }),
      ],
    });
  },
};
