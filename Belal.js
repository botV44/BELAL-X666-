const login = require("facebook-chat-api");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const config = require("./config.json");

const BOTNAME = config.BOTNAME || "Belal Chat Bot";
const PREFIX = config.PREFIX || "!";
const OWNER = config.Author || "Belal";
const ENABLED = config.Modules || {};

console.clear();
console.log(chalk.cyan.bold(`•═ ${BOTNAME} ═•`));
console.log(chalk.yellow.bold(`OWNER: ${OWNER}`));
console.log(chalk.green.bold(`PREFIX: ${PREFIX}`));

const commands = {};
const commandDir = path.join(__dirname, "Script");
fs.readdirSync(commandDir).forEach(file => {
  if (!file.endsWith(".js")) return;
  const name = file.replace(".js", "");
  if (ENABLED[name] === false) return;
  try {
    commands[name] = require(path.join(commandDir, file));
    console.log(chalk.green(`✓ Loaded: ${name}`));
  } catch (err) {
    console.log(chalk.red(`✗ Failed: ${name} → ${err.message}`));
  }
});

const appStateSource = config.APPSTATEPATH || "env:APPSTATE_JSON";
let appState;
if (appStateSource.startsWith("env:")) {
  const envKey = appStateSource.split(":")[1];
  const raw = process.env[envKey];
  if (!raw) throw new Error(`Missing ${envKey} in .env`);
  appState = JSON.parse(raw);
} else {
  if (!fs.existsSync(appStateSource)) throw new Error(`Missing ${appStateSource}`);
  appState = JSON.parse(fs.readFileSync(appStateSource, "utf8"));
}

login({ appState }, (err, api) => {
  if (err) return console.log(chalk.red(`❌ Login failed: ${err.message}`));
  api.setOptions({
    listenEvents: true,
    autoReconnect: true
  });
  console.log(chalk.cyan.bold(`✅ ${BOTNAME} is now active`));

  api.listenMqtt(async (err, event) => {
    if (err || !event.body || !event.threadID) return;
    const msg = event.body.trim();
    const threadID = event.threadID;

    // Help
    if (msg === `${PREFIX}help` && commands.help) {
      api.sendMessage(await commands.help({ PREFIX, BOTNAME }), threadID);
    }

    // Ping
    else if (msg === `${PREFIX}ping`) {
      api.sendMessage(`🏓 ${BOTNAME} চলছে!`, threadID);
    }

    // Roast
    else if (msg.startsWith(`${PREFIX}roast`) && commands.roast) {
      api.sendMessage(await commands.roast(), threadID);
    }

    // Inbox
    else if (msg.startsWith(`${PREFIX}inbox`) && commands.inbox) {
      api.sendMessage(await commands.inbox(msg, api), threadID);
    }

    // ChatGPT
    else if (msg.startsWith(`${PREFIX}chatgpt`) && commands.chatgpt) {
      const prompt = msg.slice(`${PREFIX}chatgpt`.length).trim();
      api.sendMessage(await commands.chatgpt(prompt), threadID);
    }

    // Gemini
    else if (msg.startsWith(`${PREFIX}gemini`) && commands.gemini) {
      const prompt = msg.slice(`${PREFIX}gemini`.length).trim();
      api.sendMessage(await commands.gemini(prompt), threadID);
    }

    // QueenChat
    else if (msg.startsWith(`${PREFIX}queen`) && commands.queenchat) {
      const prompt = msg.slice(`${PREFIX}queen`.length).trim();
      api.sendMessage(await commands.queenchat(prompt), threadID);
    }

    // File API
    else if (msg.startsWith(`${PREFIX}fileapi`) && commands.fileapi) {
      api.sendMessage(await commands.fileapi(msg), threadID);
    }
  });
});
