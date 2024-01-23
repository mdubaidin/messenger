import Redis from 'ioredis';

const redis = new Redis({
    port: process.env.REDIS_PORT,
    lazyConnect: true,
    keepAlive: 1000,
});

redis.on('error', err => console.log(err));

export default redis;
