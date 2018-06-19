const express = require('express');
const httpError = require('http-errors');
const solutions = require('./controllers/solutions');
const app = express();

app.get('/', solutions.runTest1);
app.get('/test2', solutions.runTest2);
app.all('/*', (req, res, next) => next(httpError.NotFound('route_unknown')));

app.use((err, req, res, next) => {
  if (!err) return next();
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  return res.status(500).send({ error: err, message: err.stack });
});

process.on('uncaughtException', err => {
  console.log('uncaught exception', err);
});

process.on('unhandledRejection', err => {
  console.log('uncaught promise rejection', err);
});

const webServer = app.listen(9999);
console.log('Listening on port %d', webServer.address().port);
