/**
 * Centralized secret accessor.
 * Currently reads from process.env.
 * Designed for easy swap to AWS SSM, HashiCorp Vault, etc.
 */

const get = (key, fallback = undefined) => {
  const value = process.env[key];
  if (value === undefined && fallback === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value !== undefined ? value : fallback;
};

/**
 * Returns the LLM provider name.
 * In production: REQUIRES LLM_PROVIDER to be set — crashes on startup otherwise.
 * In development: falls back to 'mock' for convenience.
 */
const llmProvider = () => {
  const value = process.env.LLM_PROVIDER;

  if (process.env.NODE_ENV === 'production' && !value) {
    throw new Error(
      'FATAL: LLM_PROVIDER is not set in production! ' +
      'Set it to "gemini", "openai", or "anthropic" in your Render environment variables. ' +
      'The server will NOT start with mock provider in production.'
    );
  }

  return value || 'mock';
};

module.exports = {
  jwtSecret: () => get('JWT_SECRET'),
  jwtRefreshSecret: () => get('JWT_REFRESH_SECRET'),
  jwtExpiresIn: () => get('JWT_EXPIRES_IN', '15m'),
  jwtRefreshExpiresIn: () => get('JWT_REFRESH_EXPIRES_IN', '7d'),
  openaiApiKey: () => get('OPENAI_API_KEY', ''),
  openaiModel: () => get('OPENAI_MODEL', 'gpt-4o-mini'),
  anthropicApiKey: () => get('ANTHROPIC_API_KEY', ''),
  anthropicModel: () => get('ANTHROPIC_MODEL', 'claude-3-haiku-20240307'),
  geminiApiKey: () => get('GEMINI_API_KEY', ''),
  geminiModel: () => get('GEMINI_MODEL', 'gemini-2.5-flash'),
  llmProvider,
  billingWebhookSecret: () => get('BILLING_WEBHOOK_SECRET', ''),
};
