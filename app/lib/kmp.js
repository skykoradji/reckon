/**
 * build prefix table for the KMP algorithm
 * @param  {[type]} word [description]
 * @return {[type]}      [description]
 */
function buildPrefixTable(word) {
  const prefixTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      prefixTable[suffixIndex] = prefixIndex + 1;
      suffixIndex++;
      prefixIndex++;
    } else if (prefixIndex === 0) {
      prefixTable[suffixIndex] = 0;
      suffixIndex++;
    } else {
      prefixIndex = prefixTable[prefixIndex - 1];
    }
  }

  return prefixTable;
}

/**
 * kmp algorithm
 * @param  {[type]} text [description]
 * @param  {[type]} word [description]
 * @return {[type]}      [description]
 */
function kmp(text, word) {
  let i = 0;
  let j = 0;

  const prefixTable = buildPrefixTable(word);
  const results = [];
  while (i < text.length) {
    if (text[i] === word[j]) {
      // We've found a match.
      if (j === word.length - 1) {
        results.push(i - word.length + 2);
      }
      j++;
      i++;
    } else if (j > 0) {
      j = prefixTable[j - 1];
    } else {
      j = 0;
      i++;
    }
  }
  return results.length ? results.join(', ') : '<No Output>';
}

module.exports = kmp;
