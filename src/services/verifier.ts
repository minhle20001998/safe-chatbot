import natural from 'natural';
import { DISALLOWED_WORDS } from '../constants';
import { cleanUpInput } from '../helper';

// Stemmer reduces the word to its base form
const stemmer = natural.PorterStemmer;

// Initialize the sentiment analyzer
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

/**
 * Checks if input contains disallowed content or attempt-bypass disallowed words.
 * @param {string} input - User input.
 * @returns {boolean} - True if input is allowed, False otherwise.
 */
function isInputAllowed(input: string): boolean {
  const tokens = cleanUpInput(input).split(/\s+/);
  return !tokens.some((token) => {
    const stemmedToken = stemmer.stem(token);
    return DISALLOWED_WORDS.some((word) => {
      return stemmedToken === stemmer.stem(word);
    });
  });
}

/**
 * Checks if input contains offensive or abusive language.
 * @param {string} input - User input.
 * @returns {boolean} - False if input is allowed, True otherwise.
 */
function isInputOffensive(input: string): boolean {
  let totalScore = 0;
  cleanUpInput(input)
    .split(/\s+/)
    .forEach((word) => {
      const score = analyzer.getSentiment([word]);
      totalScore = totalScore + score;
    });
  return totalScore < 0;
}

export { isInputAllowed, isInputOffensive };
