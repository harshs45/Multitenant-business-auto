const getRedis = () => {
  if (redis) return redis;

  const redisUrl = process.env.REDIS_URL;
  console.log('Redis URL present:', !!redisUrl); // ← add this

  redis = redisUrl
    ? new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          if (times > 5) return null;
          return Math.min(times * 200, 2000);
        },
        tls: redisUrl.startsWith('rediss://') ? {} : undefined,
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
      });

  redis.on('connect', () => console.log('✅  Redis connected'));
  redis.on('error', (err) => console.error('❌  Redis error:', err.message));
  redis.on('ready', () => console.log('✅  Redis ready'));

  redis.connect().catch(err => console.error('❌ Redis connect failed:', err.message));

  return redis;
};