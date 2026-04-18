/**
 * End-to-end LLM diagnosis script.
 * Tests: env loading, provider selection, model validation, API call.
 */
require('dotenv').config();

async function diagnose() {
  console.log('═══════════════════════════════════════════');
  console.log('  LLM DIAGNOSIS REPORT');
  console.log('═══════════════════════════════════════════\n');

  // 1. Check environment variables
  console.log('── Step 1: Environment Variables ──');
  const provider = process.env.LLM_PROVIDER;
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;

  console.log(`  LLM_PROVIDER   = "${provider}" (type: ${typeof provider})`);
  console.log(`  GEMINI_API_KEY  = "${apiKey ? apiKey.slice(0, 10) + '...' : 'UNDEFINED'}" (length: ${apiKey?.length || 0})`);
  console.log(`  GEMINI_MODEL    = "${model}"`);
  console.log();

  // 2. Simulate secrets.js behavior
  console.log('── Step 2: secrets.llmProvider() simulation ──');
  const get = (key, fallback = undefined) => {
    const value = process.env[key];
    if (value === undefined && fallback === undefined) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value !== undefined ? value : fallback;
  };
  const resolvedProvider = get('LLM_PROVIDER', 'mock');
  console.log(`  Resolved provider: "${resolvedProvider}"`);
  console.log(`  Would hit 'gemini' case in switch? ${resolvedProvider === 'gemini'}`);
  console.log(`  Would hit default/mock case?       ${resolvedProvider !== 'gemini' && resolvedProvider !== 'openai' && resolvedProvider !== 'anthropic'}`);
  console.log();

  // 3. Check for potential issues
  console.log('── Step 3: Potential Issues ──');
  if (provider && provider !== provider.trim()) {
    console.log('  ⚠️  LLM_PROVIDER has leading/trailing whitespace!');
  }
  if (model && model !== model.trim()) {
    console.log('  ⚠️  GEMINI_MODEL has leading/trailing whitespace!');
  }
  if (!provider) {
    console.log('  ❌ LLM_PROVIDER is undefined - will default to "mock"');
  }
  if (!apiKey) {
    console.log('  ❌ GEMINI_API_KEY is undefined');
  }
  console.log();

  // 4. Test Gemini API with configured model
  console.log('── Step 4: Gemini API Test (configured model) ──');
  console.log(`  Testing model: "${model}"`);
  
  const url1 = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  try {
    const res1 = await fetch(url1, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Say hello in one sentence.' }] }]
      })
    });
    const data1 = await res1.json();
    if (res1.ok) {
      console.log(`  ✅ SUCCESS: ${data1.candidates?.[0]?.content?.parts?.[0]?.text?.slice(0, 100)}`);
    } else {
      console.log(`  ❌ FAILED (${res1.status}): ${JSON.stringify(data1.error || data1)}`);
    }
  } catch (e) {
    console.log(`  ❌ ERROR: ${e.message}`);
  }
  console.log();

  // 5. Test with known-good model name
  console.log('── Step 5: Gemini API Test (gemini-2.5-flash) ──');
  const url2 = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  try {
    const res2 = await fetch(url2, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Say hello in one sentence.' }] }]
      })
    });
    const data2 = await res2.json();
    if (res2.ok) {
      console.log(`  ✅ SUCCESS: ${data2.candidates?.[0]?.content?.parts?.[0]?.text?.slice(0, 100)}`);
    } else {
      console.log(`  ❌ FAILED (${res2.status}): ${JSON.stringify(data2.error || data2)}`);
    }
  } catch (e) {
    console.log(`  ❌ ERROR: ${e.message}`);
  }
  console.log();

  // 6. Test the actual llm.service.js complete() function
  console.log('── Step 6: llm.service.js complete() test ──');
  try {
    const llm = require('../src/modules/chat/llm.service');
    const result = await llm.complete(
      'You are a helpful assistant. Reply in one sentence.',
      [{ role: 'user', content: 'What is 2+2?' }]
    );
    console.log(`  Provider in metadata: "${result.metadata?.provider}"`);
    console.log(`  Response: "${result.content?.slice(0, 150)}"`);
    
    if (result.metadata?.provider === 'mock') {
      console.log('\n  🔴 ROOT CAUSE CONFIRMED: complete() returned mock response!');
      console.log('  The switch statement is falling into the default/mock case.');
    } else {
      console.log(`\n  ✅ Returned real ${result.metadata?.provider} response.`);
    }
  } catch (e) {
    console.log(`  ❌ complete() threw: ${e.message}`);
    console.log('  🔴 Gemini API call failed, which may cause fallback to mock.');
  }

  console.log('\n═══════════════════════════════════════════');
}

diagnose();
