// index.js — BELAL X666 entry point
require('dotenv').config();
const { logInfo, logWarn } = require('./utils/logger');
const config = require('./bot.config.json');
const fs = require('fs');
const path = require('path');

logInfo(`BELAL X666 started | Prefix: ${config.prefix} | Language: ${config.language}`);

const langFile = path.join(__dirname, 'lang', `${config.language}.json`);
let MESSAGES = {};
try {
  MESSAGES = JSON.parse(fs.readFileSync(langFile, 'utf-8'));
} catch {
  logWarn(`Language file not found, falling back to en.json`);
  MESSAGES = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'en.json'), 'utf-8'));
}

// Placeholder client
function initClient() {
  logInfo('Client initialized (placeholder)');
  return {
    onMessage: (handler) => logInfo('Message listener bound'),
    sendText: (to, text) => logInfo(`Send to ${to}: ${text}`)
  };
}

const client = initClient();

function handleFallback(to) {
  client.sendText(to, MESSAGES.fallback);
}
function handleHelp(to) {
  client.sendText(to, MESSAGES.help);
}

function handleIncoming({ from, text }) {
  if (!text.startsWith(config.prefix)) return handleFallback(from);
  const cmd = text.slice(config.prefix.length).trim();
  if (cmd === 'help') return handleHelp(from);
  return handleFallback(from);
}

client.onMessage(handleIncoming);
