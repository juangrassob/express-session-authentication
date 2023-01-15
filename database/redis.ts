import { createClient } from 'redis';

const redisClient = createClient({
  legacyMode: true,
  url: 'redis://localhost:6379',
});

redisClient.connect();

redisClient.on('error', console.log);

export default redisClient;
