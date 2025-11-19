const fbClient = require('./utils/fbClient');
const commands = require('./commands');

fbClient((api) => {
  api.setOptions({ listenEvents: true });

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    if (event.type !== 'message') return;

    const msg = event.body;
    const sender = event.senderID;

    if (msg.startsWith('!roast')) {
      api.sendMessage(commands.roast(), sender);
    } else if (msg.startsWith('!inbox')) {
      api.sendMessage(commands.inbox(msg), sender);
    } else {
      api.sendMessage('Unknown command. Try !help', sender);
    }
  });
});
