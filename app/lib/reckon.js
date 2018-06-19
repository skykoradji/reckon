const request = require('requestretry');

const retryConfig = {
  json: true,
  maxAttempts: 100,
  retryDelay: 5000, // (default) wait for 5s before trying again
  retryStrategy: (err, response, body) => {
    // retry the request if we had an error or if the response code is above or equal 500
    const isRetry = err || response.statusCode >= 500;
    if (isRetry) {
      console.log('retry now');
    }
    return isRetry;
  }
};

const getRangeInfo = async () => {
  const options = Object.assign({}, retryConfig, {
    url: 'https://join.reckon.com/test1/rangeInfo'
  });
  const response = await request(options);
  return response.body;
};

const getDivisorInfo = async () => {
  const options = Object.assign({}, retryConfig, {
    url: 'https://join.reckon.com/test1/divisorInfo'
  });
  const response = await request(options);
  return response.body;
};

const getTextToSearch = async () => {
  const options = Object.assign({}, retryConfig, {
    url: 'https://join.reckon.com/test2/textToSearch'
  });
  const response = await request(options);
  return response.body;
};

const getSubTexts = async () => {
  const options = Object.assign({}, retryConfig, {
    url: 'https://join.reckon.com/test2/subTexts'
  });
  const response = await request(options);
  return response.body;
};

const submitResults = async results => {
  const options = Object.assign({}, retryConfig, {
    method: 'POST',
    url: 'https://join.reckon.com/test2/submitResults'
  });

  const response = await request(options);
  return response.body;
};

module.exports = {
  getRangeInfo,
  getTextToSearch,
  getSubTexts,
  submitResults,
  getDivisorInfo
};
