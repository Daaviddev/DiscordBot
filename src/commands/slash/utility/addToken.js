const { SlashCommandBuilder } = require('discord.js');
const db = require('../../../handlers/firebase');
const addTokenSelect = require('../../../components/base/selects/addTokenSelect');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('add_token')
    .setDescription('Add a token to your server.'),
  run: async (_client, interaction) => {
    // Fetch tokens from Firestore
    const sharedTokensCollection = db.collection('sharedTokens');
    const tokensSnapshot = await sharedTokensCollection.get();
    const tokens = tokensSnapshot.docs.map((doc) => ({
      label: doc.data().name,
      value: doc.id,
    }));

    tokens.push({ label: 'New Token', value: 'new' });

    const menu = addTokenSelect(tokens);

    await interaction.reply({
      content:
        'Select token to add it to server or select NEW to add new token.',
      components: [menu],
      ephemeral: true,
    });
  },
};
