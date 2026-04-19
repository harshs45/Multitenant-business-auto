const OpenAI = require('openai');
const { withRetry } = require('../utils/retry');

/**
 * Groq LLM Provider
 * Uses OpenAI-compatible API
 */
const chat = async (systemPrompt, userMessage) => {
  const apiKey = process.env.GROQ_KEY;
  const modelName = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

  if (!apiKey) throw new Error('GROQ_KEY is not configured');

  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  const messages = [
    { role: 'system', content: systemPrompt },
    ...(Array.isArray(userMessage)
      ? userMessage.map(m => ({ role: m.role, content: m.content }))
      : [{ role: 'user', content: userMessage }])
  ];

  return withRetry(async () => {
    const response = await client.chat.completions.create({
      model: modelName,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    return {
      content: response.choices[0].message.content,
      metadata: {
        provider: 'groq',
        model: response.model,
        usage: response.usage
      }
    };
  });
};

module.exports = { chat };
