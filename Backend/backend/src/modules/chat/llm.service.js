/**
 * LLM provider service.
 * Refactored to use the centralized LLM abstraction layer with fallback chain.
 */
const { chatWithFallback } = require('../../common/llm');

/**
 * Routes the completion request to the configured LLM provider.
 * Automatically falls back to next provider in LLM_FALLBACK_CHAIN on 429.
 * @param {string} systemPrompt
 * @param {Array|string} messages - Can be a history array or a single string.
 */
const complete = async (systemPrompt, messages) => {
  return await chatWithFallback(systemPrompt, messages);
};

module.exports = { complete };