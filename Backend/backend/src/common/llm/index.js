const secrets = require('../../config/secrets');
const gemini = require('./gemini');
const openai = require('./openai');
const anthropic = require('./anthropic');
const ollama = require('./ollama');
const mock = require('./mock');

/**
 * LLM Provider Factory
 */
const getProvider = () => {
  const provider = secrets.llmProvider();

  switch (provider) {
    case 'openai':
      return openai;
    case 'anthropic':
      return anthropic;
    case 'ollama':
      return ollama;
    case 'gemini':
      return gemini;
    case 'mock':
    default:
      if (provider !== 'mock') {
        console.warn(`[LLM] ⚠️  Unknown provider "${provider}", falling back to mock.`);
      }
      return mock;
  }
};

module.exports = { getProvider };
