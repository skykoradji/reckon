const reckonService = require('../service/reckon');
const { asyncMiddleware } = require('../lib/utils');

const runTest1 = asyncMiddleware(async (req, res, next) => {
  const result = await reckonService.getDivisorOutput();
  res.setHeader('content-type', 'text/html');
  return res.status(200).send(result.join('<br />'));
});

const runTest2 = asyncMiddleware(async (req, res, next) => {
  const results = await reckonService.getSearchOutput();
  await reckonService.submitResults(results);
  return res.json(results);
});

module.exports = {
  runTest1,
  runTest2
};
