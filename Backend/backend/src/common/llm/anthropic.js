const Anthropic = require('@anthropic-ai/sdk');
const secrets = require('../../config/secrets');
const { withRetry } = require('../utils/retry');

const chat = async (systemPrompt, userMessage) => {
  const apiKey = secrets.anthropicApiKey();
  const modelName = secrets.anthropicModel();

  if (!apiKey) throw new Error('ANTHROPIC_KEY is not configured');

  const anthropic = new Anthropic({ apiKey });

  const messages = Array.isArray(userMessage)
    ? userMessage.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
    : [{ role: 'user', content: userMessage }];

  return withRetry(async () => {
    const response = await anthropic.messages.create({
      model: modelName,
      system: systemPrompt,
      messages,
      max_tokens: 1024,
    });

    return {
      content: response.content[0].text,
      metadata: {
        provider: 'anthropic',
        model: response.model,
        usage: response.usage
      }
    };
  });
};

module.exports = { chat };
