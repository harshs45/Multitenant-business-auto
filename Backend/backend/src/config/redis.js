const Redis = require('ioredis');

let redis = null;

const getRedis = () => {
  if (redis) return redis;

  redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 5) return null;               // stop retrying after 5 attempts
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,                           // don't connect until first command
  });

  redis.on('connect', () => console.log('✅  Redis connected'));
  redis.on('error', (err) => console.error('❌  Redis error:', err.message));

  return redis;
};

module.exports = { getRedis };
