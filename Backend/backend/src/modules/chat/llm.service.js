/**
 * LLM provider service.
 * Refactored to use the centralized LLM abstraction layer.
 */
const { getProvider } = require('../../common/llm');

/**
 * Routes the completion request to the configured LLM provider.
 * @param {string} systemPrompt 
 * @param {Array|string} messages - Can be a history array or a single string.
 */
const complete = async (systemPrompt, messages) => {
  const provider = getProvider();
  
  // The new providers handle both string and array for 'messages' (userMessage)
  // as per the updated interface requirement.
  return await provider.chat(systemPrompt, messages);
};

module.exports = { complete };

