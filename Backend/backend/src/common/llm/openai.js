const OpenAI = require('openai');
const secrets = require('../../config/secrets');
const { withRetry } = require('../utils/retry');

const chat = async (systemPrompt, userMessage) => {
  const apiKey = secrets.openaiApiKey();
  const modelName = secrets.openaiModel();

  if (!apiKey) throw new Error('OPENAI_KEY is not configured');

  const openai = new OpenAI({ apiKey });

  const messages = [
    { role: 'system', content: systemPrompt },
    ...(Array.isArray(userMessage) 
        ? userMessage.map(m => ({ role: m.role, content: m.content })) 
        : [{ role: 'user', content: userMessage }])
  ];

  return withRetry(async () => {
    const response = await openai.chat.completions.create({
      model: modelName,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    return {
      content: response.choices[0].message.content,
      metadata: {
        provider: 'openai',
        model: response.model,
        usage: response.usage
      }
    };
  });
};

module.exports = { chat };
