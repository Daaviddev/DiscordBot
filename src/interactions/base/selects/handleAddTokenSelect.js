const { ChannelType } = require('discord.js');

const db = require('../../../handlers/firebase');
const serversFunctions = require('../../../database/serversFunctions');

const createNewTokenModal = require('../../../components/dynamic/modals/newTokenModal');

module.exports = {
  customId: 'add_token_select',
  async run(client, interaction) {
    try {
      const selectedToken = interaction.values[0];
      if (!selectedToken) {
        console.error('No value selected in the select menu');
        return;
      }

      if (selectedToken === 'new') {
        // Create and show the modal
        const modal = createNewTokenModal(client);
        await interaction.showModal(modal);
      } else {
        // logic for fetching the selected token from Firestore and adding it to the server
        const sharedTokensCollection = db.collection('sharedTokens');
        const tokenSnapshot = await sharedTokensCollection
          .doc(selectedToken)
          .get();
        const token = tokenSnapshot.data();
        const serverId = interaction.guild.id;

        await serversFunctions.addTokenToServerByName(serverId, token.name);
        await interaction.reply(`Token ${selectedToken} selected.`);

        // Create a new channel with the token's name
        try {
          // Check if a channel with the same name already exists
          const existingChannel = interaction.guild.channels.cache.find(
            (channel) => channel.name.toLowerCase() === token.name.toLowerCase()
          );

          if (existingChannel) {
            await interaction.editReply({
              content: 'A channel with this name already exists!',
            });
          } else {
            await interaction.guild.channels.create({
              name: token.name, // Specify the channel name
              type: ChannelType.GuildText, // Use the ChannelType enum for the channel type
              reason: `Channel for the new token: ${token.name}`,
            });

            // Sending success message
            await interaction.editReply({
              content: 'Token and channel created successfully!',
            });
          }
        } catch (error) {
          console.error('Error creating channel:', error);
          await interaction.editReply({
            content:
              'Something went wrong while creating the channel, please try again.',
          });
        }
      }
    } catch (error) {
      console.error('Error in select-token interaction:', error);
      await interaction.reply({
        content: 'There was an error executing this interaction!',
        ephemeral: true,
      });
    }
  },
};
