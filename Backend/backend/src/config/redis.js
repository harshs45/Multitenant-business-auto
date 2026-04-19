const Redis = require('ioredis');

let redis = null;

const getRedis = () => {
  if (redis) return redis;

  const redisUrl = process.env.REDIS_URL;

  redis = redisUrl
    ? new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          if (times > 5) return null;
          return Math.min(times * 200, 2000);
        },
        lazyConnect: true,
        tls: redisUrl.startsWith('rediss://') ? {} : undefined, // Upstash requires TLS
      })
    : new Redis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          if (times > 5) return null;
          return Math.min(times * 200, 2000);
        },
        lazyConnect: true,
      });

  redis.on('connect', () => console.log('✅  Redis connected'));
  redis.on('error', (err) => console.error('❌  Redis error:', err.message));

  return redis;
};

module.exports = { getRedis };