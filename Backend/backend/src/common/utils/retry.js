/**
 * Utility for retrying async operations with exponential backoff.
 * Specifically handles 429 Too Many Requests errors.
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extracts retry delay from error messages like "Please retry in 8.4s"
 * @param {string} message 
 * @returns {number|null} delay in milliseconds or null if not found
 */
const extractDelayFromMessage = (message) => {
  if (!message) return null;
  const match = message.match(/retry in ([\d.]+)s/i);
  if (match && match[1]) {
    return parseFloat(match[1]) * 1000;
  }
  return null;
};

/**
 * Executes a function with retries for 429 status codes.
 * @param {Function} fn - The async function to execute.
 * @param {number} maxRetries - Maximum number of retries.
 * @param {number} initialDelayMs - Initial delay for exponential backoff.
 */
const withRetry = async (fn, maxRetries = 3, initialDelayMs = 2000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Check if it's a 429 error
      // Different SDKs have different error formats
      const status = error.status || error.statusCode || error.response?.status;
      const isRateLimit = status === 429 || (error.message && error.message.includes('429'));
      
      if (!isRateLimit || attempt === maxRetries) {
        throw error;
      }
      
      let delay = initialDelayMs * Math.pow(2, attempt);
      
      // Try to extract specific delay from message
      const extractedDelay = extractDelayFromMessage(error.message);
      if (extractedDelay) {
        delay = extractedDelay + 500; // Add small buffer
        console.log(`[Retry] extracted delay from message: ${delay}ms`);
      } else {
        console.log(`[Retry] attempt ${attempt + 1} failed with 429. Retrying in ${delay}ms...`);
      }
      
      await sleep(delay);
    }
  }
  
  throw lastError;
};

module.exports = { withRetry };
