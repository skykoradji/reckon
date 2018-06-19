const reckonAPI = require('../lib/reckon');
const kmp = require('../lib/kmp');

async function getDivisorOutput() {
  const ranges = await reckonAPI.getRangeInfo();
  const { outputDetails } = await reckonAPI.getDivisorInfo();
  const output = [];
  for (let i = ranges.lower; i < ranges.upper; i++) {
    let singleLine = `${i}: `;
    for (let j = 0; j < outputDetails.length; j++) {
      if (i >= outputDetails[j].divisor && i % outputDetails[j].divisor === 0) {
        singleLine += `${outputDetails[j].output}`;
      }
    }
    output.push(singleLine);
  }
  return output;
}

async function getSearchOutput() {
  const { text } = await reckonAPI.getTextToSearch();
  const { subTexts } = await reckonAPI.getSubTexts();
  const results =
    subTexts &&
    subTexts.map(current => {
      return {
        subtext: current,
        result: kmp(text.toLowerCase(), current.toLowerCase())
      };
    });

  return {
    candidate: 'Alex You',
    text: text,
    results: results
  };
}

async function submitResults(results) {
  await reckonAPI.submitResults(results);
}

module.exports = {
  getDivisorOutput,
  getSearchOutput,
  submitResults
};
