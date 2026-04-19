const secrets = require('../../config/secrets');
const gemini = require('./gemini');
const openai = require('./openai');
const anthropic = require('./anthropic');
const ollama = require('./ollama');
const mock = require('./mock');
const groq = require('./groq');

const PROVIDERS = { gemini, openai, anthropic, ollama, mock, groq };

const getProvider = () => {
  const provider = secrets.llmProvider();
  if (!PROVIDERS[provider]) {
    console.warn(`[LLM] ⚠️  Unknown provider "${provider}", falling back to mock.`);
    return mock;
  }
  return PROVIDERS[provider];
};

/**
 * Calls the LLM with automatic provider fallback on 429 quota errors.
 * Reads LLM_FALLBACK_CHAIN env var (e.g. "gemini,openai,anthropic")
 */
const chatWithFallback = async (systemPrompt, userMessage) => {
  const primary = secrets.llmProvider();
  const chainEnv = process.env.LLM_FALLBACK_CHAIN || primary;
  const chain = chainEnv
    .split(',')
    .map(p => p.trim().toLowerCase())
    .filter(p => PROVIDERS[p]); // skip unknown providers

  // Ensure primary is always first
  if (!chain.includes(primary)) chain.unshift(primary);

  let lastError;

  for (const providerName of chain) {
    const provider = PROVIDERS[providerName];

    // Skip if API key is missing (except ollama and mock which need no key)
    const keyless = ['ollama', 'mock'];
    const keyMap = {
      gemini: process.env.GEMINI_KEY || process.env.GEMINI_API_KEY,
      openai: process.env.OPENAI_KEY,
      anthropic: process.env.ANTHROPIC_KEY,
      groq: process.env.GROQ_KEY,
    };

    if (!keyless.includes(providerName) && !keyMap[providerName]) {
      console.warn(`[LLM] Skipping "${providerName}" — no API key configured.`);
      continue;
    }

    try {
      console.log(`[LLM] Trying provider: ${providerName}`);
      const response = await provider.chat(systemPrompt, userMessage);
      if (providerName !== primary) {
        console.log(`[LLM] ✅ Used provider: ${providerName} (${primary} exhausted)`);
      }
      return response;
    } catch (err) {
      const is429 = err.message?.includes('429') || err.status === 429;
      if (is429) {
        console.warn(`[LLM] ⚠️  ${providerName} quota exhausted, trying next provider...`);
        lastError = err;
        continue; // try next in chain
      }
      // Non-429 error (auth, bad request etc) — fail immediately
      console.error(`[LLM] ❌ ${providerName} failed with non-retryable error:`, err.message);
      throw err;
    }
  }

  // All providers exhausted
  console.error('[LLM] ❌ All providers in fallback chain exhausted.');
  throw new Error('Our AI service is temporarily busy, please try again in a few minutes.');
};

module.exports = { getProvider, chatWithFallback };