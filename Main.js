require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { log } = require('./utils/log');
const { t } = require('./utils/text');
const config = require('./config.json');
const handleMessage = require('./includes/handleMessage');
const loadCommands = require('./includes/loader');
const { checkOwner } = require('./includes/permissions');

// Placeholder Messenger Client (replace with real login using appstate.json)
const EventEmitter = require('events');
class FakeMessenger extends EventEmitter {
  sendMessage(text, threadID) {
    log('info', `→ ${threadID}: ${text}`);
  }
}
const client = new FakeMessenger();

// Load commands on start
const commands = loadCommands(path.join(__dirname, 'scripts'));
log('info', `Loaded ${Object.keys(commands).length} command(s).`);

client.on('message', async (event) => {
  try {
    await handleMessage({ client, event, commands, config });
  } catch (err) {
    log('error', err.stack || err.message);
    client.sendMessage(t('error_generic', config.language), event.threadID);
  }
});

// Simulate incoming messages for local testing
if (process.env.LOCAL_TEST === '1') {
  setTimeout(() => {
    client.emit('message', { body: `${config.prefix}help`, threadID: 'local-thread', senderID: 'user1' });
  }, 1000);
}

// In real use: initialize real Messenger client with appstate.json
log('info', 'BOTX666 started. Waiting for messages...');
