module.exports.CacheService = context => {
  const hashCache = { 'qual seu nome?': { 'query': 'qual seu nome?', 'topScoringIntent': { 'intent': 'None', 'score': 0.943249166 }, 'intents': [ { 'intent': 'None', 'score': 0.943249166 }, { 'intent': 'GetJobInformation', 'score': 0.059358988 }, { 'intent': 'ApplyForJob', 'score': 0.00296497671 } ], 'entities': [] } };
  let cacheQuery = hashCache[context.query];
  if (cacheQuery !== undefined) {
    console.log('Pegando do cache');
    context.data = cacheQuery;
  }
  return context;
};
