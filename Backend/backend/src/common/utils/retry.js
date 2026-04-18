const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const extractDelayFromMessage = (message) => {
  if (!message) return null;
  const match = message.match(/retry in ([\d.]+)s/i);
  if (match && match[1]) {
    return parseFloat(match[1]) * 1000;
  }
  return null;
};

const withRetry = async (fn, maxRetries = 3, initialDelayMs = 2000) => {
  const MAX_WAIT_MS = 5000; // ← never wait more than 5s before giving up
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      const status = error.status || error.statusCode || error.response?.status;
      const isRateLimit = status === 429 || (error.message && error.message.includes('429'));
      
      if (!isRateLimit || attempt === maxRetries) {
        throw error;
      }
      
      let delay = initialDelayMs * Math.pow(2, attempt);
      
      const extractedDelay = extractDelayFromMessage(error.message);
      if (extractedDelay) {
        delay = Math.min(extractedDelay + 500, MAX_WAIT_MS); // ← capped here
        console.log(`[Retry] extracted delay (capped): ${delay}ms`);
      } else {
        delay = Math.min(delay, MAX_WAIT_MS); // ← and here
        console.log(`[Retry] attempt ${attempt + 1} failed with 429. Retrying in ${delay}ms...`);
      }
      
      await sleep(delay);
    }
  }
  
  throw lastError;
};

module.exports = { withRetry };