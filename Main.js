/**
 * BOTX666 — Core Main
 * Power-updated: multilingual, multi-prefix, multi-admin, cooldown, quotes, AI routing (QueenChat/ChatGPT/Gemini)
 */
require('dotenv').config();
const EventEmitter = require('events');
const os = require('os');
const crypto = require('crypto');

// Inline helpers to keep this file self-contained for now
const nowISO = () => new Date().toISOString();
const log = (level, msg) => console.log(`[${nowISO()}] [${String(level).toUpperCase()}] ${msg}`);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const pad = (s, n) => (s || '').toString().padEnd(n, ' ');

// Load configuration
const config = require('./config.json');

// Build prefix matcher (supports single string or array of strings)
const PREFIXES = Array.isArray(config.prefixes) && config.prefixes.length
  ? config.prefixes
  : [config.prefix || '!'];

// Admins list
const ADMINS = Array.isArray(config.admins) ? config.admins.map(String) : [];

// Cooldown per user (ms)
const COOLDOWN_MS = Number(config.features?.cooldownMs || 1200);

// Simple in-memory command registry
const commands = Object.create(null);

// Minimal fake messenger client (replace with real client using appstate.json later)
class MessengerClient extends EventEmitter {
  sendMessage(text, threadID) {
    log('info', `→ [${threadID}] ${text}`);
  }
}
const client = new MessengerClient();

// ---------- AI routing stubs (QueenChat + ChatGPT + Gemini) ----------
const AI = {
  async ask({ provider, prompt }) {
    const prov = provider || config.ai?.provider || 'none';

    if (prov === 'queen') {
      const key = process.env.QUEEN_API_KEY || config.ai?.queen?.apiKey;
      if (!key) return `[QueenChat offline] ${prompt}`;
      // Place your actual QueenChat API call here
      return `QueenChat: ${prompt}`;
    }

    if (prov === 'chatgpt') {
      const key = process.env.OPENAI_API_KEY || config.ai?.chatgpt?.apiKey;
      if (!key) return `[ChatGPT offline] ${prompt}`;
      // Place your actual OpenAI API call here
      return `ChatGPT: ${prompt}`;
    }

    if (prov === 'gemini') {
      const key = process.env.GEMINI_API_KEY || config.ai?.gemini?.apiKey;
      if (!key) return `[Gemini offline] ${prompt}`;
      // Place your actual Gemini API call here
      return `Gemini: ${prompt}`;
    }

    return `AI disabled: ${prompt}`;
  }
};

// ---------- Text and quotes ----------
const QUOTES = Array.isArray(config.quotes) ? config.quotes.slice(0, 200) : [];
const randomQuote = () => QUOTES.length ? QUOTES[Math.floor(Math.random() * QUOTES.length)] : null;

// ---------- Permissions ----------
const isAdmin = (senderID) => ADMINS.includes(String(senderID));

// ---------- Cooldown tracking ----------
const lastUse = new Map();
const canRun = (senderID) => {
  const t = Date.now();
  const prev = lastUse.get(senderID) || 0;
  if (t - prev < COOLDOWN_MS) return false;
  lastUse.set(senderID, t);
  return true;
};

// ---------- Prefix + parse ----------
function parseCommand(message) {
  const text = (message || '').trim();
  const matched = PREFIXES.find(p => text.startsWith(p));
  if (!matched) return null;
  const rest = text.slice(matched.length).trim();
  const [name, ...args] = rest.split(/\s+/);
  return { name: (name || '').toLowerCase(), args, prefix: matched };
}

// ---------- Register core commands (self-contained) ----------
function register(name, handler, description, flags = {}) {
  commands[name.toLowerCase()] = { run: handler, description, flags };
}

register('help', async ({ threadID }) => {
  const list = Object.keys(commands)
    .map(c => `• ${PREFIXES[0]}${c}`)
    .join('\n');
  client.sendMessage(
    `Help — ${config.botNickname || 'BOTX666'}\n${list}\n\nPrefix(es): ${PREFIXES.join(', ')}`,
    threadID
  );
}, 'Show available commands');

register('ping', async ({ threadID }) => {
  client.sendMessage('pong', threadID);
}, 'Heartbeat');

register('ai', async ({ threadID, args, senderID }) => {
  if (!args.length) return client.sendMessage('Usage: !ai <prompt>', threadID);
  const prompt = args.join(' ');
  const reply = await AI.ask({ provider: config.ai?.provider, prompt });
  client.sendMessage(String(reply), threadID);
}, 'Ask the configured AI');

register('sys', async ({ threadID, senderID }) => {
  if (!isAdmin(senderID)) return client.sendMessage('Admin only.', threadID);
  const info = [
    `Host: ${os.hostname()}`,
    `Platform: ${os.platform()} ${os.arch()}`,
    `Node: ${process.version}`,
    `Memory: ${Math.round(process.memoryUsage().rss / (1024 * 1024))} MB RSS`,
    `Uptime: ${Math.round(process.uptime())}s`
  ].join('\n');
  client.sendMessage(info, threadID);
}, 'System info (admin only)', { adminOnly: true });

// ---------- Message handler ----------
client.on('message', async (event) => {
  try {
    const parsed = parseCommand(event.body);
    if (!parsed) return;

    if (!canRun(event.senderID)) {
      return client.sendMessage('Slow down a bit… ⏳', event.threadID);
    }

    const cmd = commands[parsed.name];
    if (!cmd) {
      return client.sendMessage(`Unknown command: ${parsed.name}`, event.threadID);
    }

    await cmd.run({
      threadID: event.threadID,
      senderID: event.senderID,
      args: parsed.args,
      prefix: parsed.prefix
    });
  } catch (err) {
    log('error', err.stack || err.message);
    client.sendMessage('Unexpected error occurred.', event.threadID);
  }
});

// ---------- Startup banner (show your name big) ----------
async function banner() {
  const line = '='.repeat(60);
  const nick = config.botNickname || 'BOTX666';
  const ownerName = (config.ownerName || 'MZ').toUpperCase(); // your name large
  const quote = randomQuote() || 'Stay sharp. Ship fast.';

  console.log('\n' + line);
  console.log(pad('', 5) + `🔥 ${nick} is live`);
  console.log(pad('', 5) + `👑 OWNER: ${ownerName}`);
  console.log(pad('', 5) + `⚙️  Prefix(es): ${PREFIXES.join(', ')}`);
  console.log(pad('', 5) + `💬 Quote: "${quote}"`);
  console.log(line + '\n');
}

process.on('uncaughtException', (e) => log('fatal', e.stack || e.message));
process.on('unhandledRejection', (e) => log('fatal', e.stack || e.message));

(async function start() {
  await banner();
  log('info', `${config.botNickname || 'BOTX666'} started. Waiting for messages…`);

  // Local test simulation
  if (String(process.env.LOCAL_TEST) === '1') {
    await sleep(800);
    client.emit('message', { body: `${PREFIXES[0]}help`, threadID: 'local-thread', senderID: 'user1' });
  }
})();
