const { GoogleGenerativeAI } = require('@google/generative-ai');
const secrets = require('../../config/secrets');
const { withRetry } = require('../utils/retry');

/**
 * Standardizes messages for Gemini SDK.
 * @param {string|Array} userMessage 
 * @returns {Array} List of parts
 */
const prepareContents = (userMessage) => {
  if (Array.isArray(userMessage)) {
    // If it's history, we need to map roles correctly for Gemini
    // Gemini uses 'model' instead of 'assistant'
    return userMessage.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
  }
  return [{ role: 'user', parts: [{ text: userMessage }] }];
};

const chat = async (systemPrompt, userMessage) => {
  const apiKey = secrets.geminiApiKey();
  const modelName = secrets.geminiModel();
  
  if (!apiKey) throw new Error('GEMINI_KEY is not configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: systemPrompt 
  });

  const contents = prepareContents(userMessage);

  return withRetry(async () => {
    const result = await model.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    return {
      content: text,
      metadata: {
        provider: 'gemini',
        model: modelName,
        usage: response.usageMetadata || {}
      }
    };
  });
};

module.exports = { chat };
