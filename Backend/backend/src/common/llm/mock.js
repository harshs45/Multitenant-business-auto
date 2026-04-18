/**
 * Mock LLM provider for testing and development.
 */
const chat = async (systemPrompt, userMessage) => {
  const lastMsg = Array.isArray(userMessage) 
    ? userMessage[userMessage.length - 1]?.content 
    : userMessage;

  console.log('[LLM:Mock] Mock response generated');

  return {
    content: `[MOCK RESPONSE] I am a mock AI. You said: "${lastMsg?.slice(0, 50)}..."`,
    metadata: {
      provider: 'mock',
      timestamp: new Date().toISOString()
    }
  };
};

module.exports = { chat };
