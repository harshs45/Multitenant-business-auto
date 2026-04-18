require('dotenv').config();
const llm = require('../src/modules/chat/llm.service');

async function testConnection() {
  console.log('--- LLM Integration Test ---');
  console.log(`Provider: ${process.env.LLM_PROVIDER || 'mock'}`);
  console.log('Sending test message...');

  const systemPrompt = 'You are a helpful assistant for BotForge, a SaaS platform for AI chatbots.';
  const messages = [
    { role: 'user', content: 'Hello! I am testing the system. Introduce yourself and tell me one key feature of BotForge.' }
  ];

  try {
    const start = Date.now();
    const response = await llm.complete(systemPrompt, messages);
    const duration = Date.now() - start;

    console.log('\n--- Response Received ---');
    console.log(`Content: ${response.content}`);
    console.log('\n--- Metadata ---');
    console.log(JSON.stringify(response.metadata, null, 2));
    console.log(`\nDuration: ${duration}ms`);
  } catch (error) {
    console.error('\n--- Error ---');
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

testConnection();
