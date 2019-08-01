const axios = require('axios');

const api = axios.create({
  baseURL: process.env.LUIS_ENDPOINT_KEY,
  // timeout: 15000,
  headers: {
    'Ocp-Apim-Subscription-Key': process.env.LUIS_AUTH_KEY
  }
});

module.exports.LuisService = async context => {
  if (context.data) return context;

  console.log(`Luis API: ${ context.query }`);
  var queryParams = {
    params: {
      spellCheck: false,
      log: true,
      verbose: false,
      q: context.query
    }
  };

  const response = await api.get(process.env.LUIS_APP_ID, queryParams);
  context.data = response.data;
  return context;
};