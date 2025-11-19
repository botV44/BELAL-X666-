const login = require('facebook-chat-api');

function loadAppState() {
  const config = require('./config.json');
  const appStateRaw = process.env.APPSTATE_JSON; // এখন .env থেকে পড়বে
  if (!appStateRaw) throw new Error("APPSTATE_JSON missing in .env");

  const appState = JSON.parse(appStateRaw);

  return new Promise((resolve, reject) => {
    login({ appState }, (err, api) => {
      if (err) return reject(err);
      api.setOptions({
        selfListen: false,
        listenEvents: true,
        autoReconnect: true
      });
      resolve(api);
    });
  });
}

function listenMqtt(api, handler) {
  api.listenMqtt((err, event) => {
    if (err) return console.error('listenMqtt error:', err);
    handler(event, api);
  });
}

module.exports = { loadAppState, listenMqtt };
