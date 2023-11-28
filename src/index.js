require('dotenv').config();
const Bot = require('./client/bot');

const client = new Bot();

client.start();

// Handles errors and avoids crashes, better to not remove them.
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
