// Entry with autoloader
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'bot.config.json');
const config = fs.existsSync(configPath)
  ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  : { prefix: '!', language: 'en' };

// simple logger
function logInfo(msg) { console.log(`[INFO] ${msg}`); }
function logWarn(msg) { console.warn(`[WARN] ${msg}`); }

// Load language messages
const langFile = path.join(__dirname, 'lang', `${config.language}.json`);
let MESSAGES = {};
try {
  MESSAGES = JSON.parse(fs.readFileSync(langFile, 'utf-8'));
} catch {
  logWarn('Language file missing, fallback to en.json');
  MESSAGES = fs.existsSync(path.join(__dirname, 'lang', 'en.json'))
    ? JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'en.json'), 'utf-8'))
    : {};
}

// Mock client
const client = {
  sendText: (to, text) => logInfo(`Send to ${to}: ${text}`),
  onMessage: (handler) => logInfo('Message listener bound')
};

// Autoload commands
const commandsDir = path.join(__dirname, 'commands'); // change to 'Comments' if you use that
const commands = {};
if (fs.existsSync(commandsDir)) {
  for (const file of fs.readdirSync(commandsDir).filter(f => f.endsWith('.js'))) {
    try {
      const cmd = require(path.join(commandsDir, file));
      if (cmd?.name && typeof cmd.execute === 'function') {
        commands[cmd.name] = cmd;
        logInfo(`Loaded command: ${cmd.name} (${file})`);
      } else {
        logWarn(`Skipped invalid command: ${file}`);
      }
    } catch (e) {
      logWarn(`Error loading ${file}: ${e.message}`);
    }
  }
} else {
  logWarn('Commands folder not found');
}

// Handlers
function handleFallback(to) {
  client.sendText(to, MESSAGES.fallback || 'Unknown command. Try !help');
}
function handleHelp(to) {
  const help = MESSAGES.help || 'Commands: !animate <prompt>, !inbox list|clear, !roast';
  client.sendText(to, help);
}

function handleIncoming({ from, text }) {
  if (!text || !text.startsWith(config.prefix)) return handleFallback(from);
  const raw = text.slice(config.prefix.length).trim();
  const [cmdName, ...args] = raw.split(/\s+/);

  if (cmdName === 'help') return handleHelp(from);

  const cmd = commands[cmdName];
  if (!cmd) return handleFallback(from);

  try {
    cmd.execute({ client, from, args, MESSAGES });
  } catch (err) {
    logWarn(`Execute error ${cmdName}: ${err.message}`);
    client.sendText(from, MESSAGES.error || 'Something went wrong.');
  }
}

// Bind listener (placeholder)
client.onMessage(handleIncoming);
logInfo(`BELAL X666 started | Prefix: ${config.prefix} | Language: ${config.language}`);
