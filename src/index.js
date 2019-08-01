require('dotenv').config();
const restify = require('restify');
const logger = require('morgan');
const helmet = require('helmet');
const {
  SacService
} = require('./services/sac');

const {
  TestLuisModel
} = require('./test');

var server = restify.createServer({
  name: 'SAC DB1 API',
  version: '1.0.0'
});

server.use(helmet());
server.use(helmet.hidePoweredBy());
server.use(logger('dev'));
server.use(restify.plugins.queryParser({
  mapParams: false
}));
server.use(restify.plugins.gzipResponse());

server.get('/api/questions', async (req, res, next) => {
  const response = await SacService(req.query.q);
  res.send(response.data);
  return next();
});

server.get('/test-luis', async (req, res, next) => {
  const processed = await TestLuisModel();
  res.send(processed);
  return next();
});

server.listen(process.env.port || process.env.PORT || 8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});