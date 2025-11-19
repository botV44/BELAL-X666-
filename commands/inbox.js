const chatgpt = require('./commands/chatgpt');
const gemini = require('./commands/gemini');
const queenchat = require('./commands/queenchat');

...

if (msg.startsWith('!chatgpt')) {
  const prompt = msg.replace('!chatgpt ', '');
  chatgpt(prompt).then(reply => api.sendMessage(reply, sender));
}

if (msg.startsWith('!gemini')) {
  const prompt = msg.replace('!gemini ', '');
  gemini(prompt).then(reply => api.sendMessage(reply, sender));
}

if (msg.startsWith('!queen')) {
  const prompt = msg.replace('!queen ', '');
  queenchat(prompt).then(reply => api.sendMessage(reply, sender));
}
