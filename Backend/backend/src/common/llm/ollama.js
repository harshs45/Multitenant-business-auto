const secrets = require('../../config/secrets');
const { withRetry } = require('../utils/retry');

const chat = async (systemPrompt, userMessage) => {
  const host = secrets.ollamaHost();
  const modelName = secrets.ollamaModel();

  const messages = [
    { role: 'system', content: systemPrompt },
    ...(Array.isArray(userMessage)
        ? userMessage.map(m => ({ role: m.role, content: m.content }))
        : [{ role: 'user', content: userMessage }])
  ];

  return withRetry(async () => {
    const response = await fetch(`${host}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: err.error || `Ollama error: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      content: data.message.content,
      metadata: {
        provider: 'ollama',
        model: modelName,
        total_duration: data.total_duration,
      }
    };
  });
};

module.exports = { chat };
