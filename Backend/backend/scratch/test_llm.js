require('dotenv').config();
const llm = require('../src/modules/chat/llm.service');

async function test() {
  try {
    console.log('Testing LLM completion...');
    console.log('Provider:', process.env.LLM_PROVIDER);
    
    const response = await llm.complete(
      'You are a friendly pirate.',
      [{ role: 'user', content: 'Hello, who are you?' }]
    );
    
    console.log('Response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error during LLM completion:', error);
  }
}

test();
