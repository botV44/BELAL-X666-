const axios = require('axios');

module.exports = async function(prompt) {
  const res = await axios.post('https://api.queenchat.xyz/v1/chat', {
    prompt
  }, {
    headers: { Authorization: `Bearer ${process.env.QUEENCHAT_API_KEY}` }
  });

  return res.data.response;
};
