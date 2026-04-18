/**
 * Final end-to-end verification of all fixes.
 * Tests: env loading, production guards, provider selection, Gemini API call.
 */
require('dotenv').config();

async function verify() {
  console.log('═══════════════════════════════════════════════');
  console.log('  FINAL VERIFICATION — ALL FIXES');
  console.log('═══════════════════════════════════════════════\n');

  // ── 1. Verify secrets.js production guard ──
  console.log('── Test 1: Production guard in secrets.js ──');
  const secrets = require('../src/config/secrets');
  
  // Simulate production with missing LLM_PROVIDER
  const origEnv = process.env.NODE_ENV;
  const origProvider = process.env.LLM_PROVIDER;
  process.env.NODE_ENV = 'production';
  delete process.env.LLM_PROVIDER;
  
  try {
    secrets.llmProvider();
    console.log('  ❌ FAIL: Should have thrown in production without LLM_PROVIDER');
  } catch (e) {
    console.log(`  ✅ PASS: Correctly threw error: "${e.message.slice(0, 60)}..."`);
  }
  
  // Restore
  process.env.NODE_ENV = origEnv;
  process.env.LLM_PROVIDER = origProvider;
  console.log();

  // ── 2. Verify dev fallback still works ──
  console.log('── Test 2: Dev fallback to mock ──');
  process.env.NODE_ENV = 'development';
  const origProvider2 = process.env.LLM_PROVIDER;
  delete process.env.LLM_PROVIDER;
  
  const devResult = secrets.llmProvider();
  console.log(`  ${devResult === 'mock' ? '✅ PASS' : '❌ FAIL'}: Dev fallback = "${devResult}"`);
  
  process.env.LLM_PROVIDER = origProvider2;
  process.env.NODE_ENV = origEnv;
  console.log();

  // ── 3. Verify provider selection ──
  console.log('── Test 3: Provider selection ──');
  const provider = secrets.llmProvider();
  console.log(`  Provider: "${provider}"`);
  console.log(`  ${provider === 'gemini' ? '✅ PASS' : '❌ FAIL'}: Expected "gemini"`);
  console.log();

  // ── 4. Verify geminiModel default updated ──
  console.log('── Test 4: Gemini model name ──');
  const model = secrets.geminiModel();
  console.log(`  Model: "${model}"`);
  console.log(`  ${model === 'gemini-2.5-flash' ? '✅ PASS' : '⚠️  CHECK'}: Expected "gemini-2.5-flash"`);
  console.log();

  // ── 5. Verify llm.service.js complete() returns Gemini ──
  console.log('── Test 5: llm.complete() end-to-end ──');
  const llm = require('../src/modules/chat/llm.service');
  
  try {
    const result = await llm.complete(
      'You are a helpful AI assistant for a pizza restaurant called "Mama Mia".',
      [{ role: 'user', content: 'What are your opening hours?' }]
    );
    
    console.log(`  Provider: "${result.metadata?.provider}"`);
    console.log(`  Model:    "${result.metadata?.model}"`);
    console.log(`  Response: "${result.content?.slice(0, 120)}..."`);
    
    const isMock = result.metadata?.provider === 'mock';
    const isGemini = result.metadata?.provider === 'gemini';
    
    if (isGemini) {
      console.log('\n  ✅ PASS: Real Gemini response received!');
    } else if (isMock) {
      console.log('\n  ❌ FAIL: Still returning mock response!');
    } else {
      console.log(`\n  ⚠️  Unexpected provider: ${result.metadata?.provider}`);
    }
  } catch (e) {
    console.log(`  ❌ ERROR: ${e.message}`);
  }

  // ── 6. Verify response uses business context ──
  console.log('\n── Test 6: Business-context response ──');
  try {
    const result = await llm.complete(
      'You are Mia, the AI assistant for "BotForge SaaS". BotForge helps businesses create no-code chatbots. Plans start at $29/month.',
      [{ role: 'user', content: 'How much does BotForge cost?' }]
    );
    
    const hasContext = /botforge|29|\$|plan|pric/i.test(result.content);
    console.log(`  Response: "${result.content?.slice(0, 150)}..."`);
    console.log(`  ${hasContext ? '✅ PASS' : '⚠️  CHECK'}: Response references business context`);
    console.log(`  ${result.metadata?.provider === 'gemini' ? '✅ PASS' : '❌ FAIL'}: Provider is Gemini`);
  } catch (e) {
    console.log(`  ❌ ERROR: ${e.message}`);
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log('  VERIFICATION COMPLETE');
  console.log('═══════════════════════════════════════════════\n');
}

verify();
