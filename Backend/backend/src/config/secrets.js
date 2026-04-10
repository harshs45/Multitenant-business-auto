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
  geminiModel: () => get('GEMINI_MODEL', 'gemini-1.5-pro'),
  llmProvider: () => get('LLM_PROVIDER', 'mock'),
  billingWebhookSecret: () => get('BILLING_WEBHOOK_SECRET', ''),
};
