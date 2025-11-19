const axios = require('axios');

module.exports = async function(prompt) {
  const res = await axios.post('https://gemini.googleapis.com/v1beta/chat:generate', {
    prompt
  }, {
    headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }
  });

  return res.data.reply;
};
