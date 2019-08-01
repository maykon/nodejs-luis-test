const { CacheService } = require('./cache');
const { LuisService } = require('./luis_api');

module.exports.SacService = query => {
  return Promise.resolve({ query })
    .then(CacheService)
    .then(LuisService)
    .catch(err => console.log(err));
};
