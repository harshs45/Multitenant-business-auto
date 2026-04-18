const dotenv = require('dotenv');
const path = require('path');

/**
 * Loads the appropriate .env file based on RUN_ENV.
 * RUN_ENV=docker loads .env.docker, otherwise defaults to .env.
 */
const loadEnv = () => {
  const runEnv = process.env.RUN_ENV || 'local';
  const envFile = runEnv === 'docker' ? '.env.docker' : '.env';
  const envPath = path.resolve(process.cwd(), envFile);

  const result = dotenv.config({ path: envPath });

  if (result.error) {
    console.warn(`⚠️  Could not load ${envFile}, falling back to system environment variables.`);
  } else {
    console.log(`✅  Environment loaded from: ${envFile}`);
  }

  validateEnv();
  logConnectionInfo();
};

/**
 * Validates required environment variables and throws if missing.
 */
const validateEnv = () => {
  const required = [
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'REDIS_HOST',
    'REDIS_PORT',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET'
  ];

  const missing = required.filter((key) => !process.env[key]);

  // In production, LLM_PROVIDER is mandatory — no silent mock fallback
  if (process.env.NODE_ENV === 'production' && !process.env.LLM_PROVIDER) {
    missing.push('LLM_PROVIDER');
  }

  // Conditional validation for LLM providers
  const provider = process.env.LLM_PROVIDER;
  if (provider === 'gemini' && !process.env.GEMINI_API_KEY) missing.push('GEMINI_API_KEY');
  if (provider === 'openai' && !process.env.OPENAI_API_KEY) missing.push('OPENAI_API_KEY');
  if (provider === 'anthropic' && !process.env.ANTHROPIC_API_KEY) missing.push('ANTHROPIC_API_KEY');

  if (missing.length > 0) {
    console.error('❌  MISSING REQUIRED ENV VARIABLES:', missing.join(', '));
    process.exit(1);
  }
};

/**
 * Logs key connection info for transparency at startup.
 */
const logConnectionInfo = () => {
  console.log('─── Connection Info ───');
  console.log(`DB_HOST:      ${process.env.DB_HOST}`);
  console.log(`DB_NAME:      ${process.env.DB_NAME}`);
  console.log(`REDIS_HOST:   ${process.env.REDIS_HOST}`);
  console.log(`LLM_PROVIDER: ${process.env.LLM_PROVIDER || '⚠️  NOT SET (will default to mock)'}`);
  console.log(`GEMINI_MODEL: ${process.env.GEMINI_MODEL || 'not set'}`);
  console.log(`GEMINI_KEY:   ${process.env.GEMINI_API_KEY ? '✅ present' : '❌ MISSING'}`);
  console.log('───────────────────────');
};

module.exports = { loadEnv };
