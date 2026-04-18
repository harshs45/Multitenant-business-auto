require('dotenv').config();
const llm = require('../src/modules/chat/llm.service');

async function testRobustness() {
  console.log('--- Testing Gemini Robustness ---');
  
  try {
    // 1. Test consecutive user messages (should be merged)
    console.log('\nTesting consecutive user messages...');
    const resp1 = await llm.complete(
      'You are a helpful assistant.',
      [
        { role: 'user', content: 'First message.' },
        { role: 'user', content: 'Second message.' }
      ]
    );
    console.log('Response 1:', resp1.content);
    console.log('Finish Reason:', resp1.metadata.finishReason);

    // 2. Test assistant mapping
    console.log('\nTesting assistant role mapping...');
    const resp2 = await llm.complete(
      'Respond with "OK".',
      [
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: 'Hello!' },
        { role: 'user', content: 'Ready?' }
      ]
    );
    console.log('Response 2:', resp2.content);

    // 3. Test safety filters (trigger something potentially sensitive but safe for testing)
    // Actually, it's hard to trigger safety filters reliably without being unsafe.
    // I'll skip triggering it but check if the code handles it by mocking if needed.

    console.log('\nRobustness tests completed successfully.');
  } catch (error) {
    console.error('Error during robustness testing:', error);
    process.exit(1);
  }
}

testRobustness();
