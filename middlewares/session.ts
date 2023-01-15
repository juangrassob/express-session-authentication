import session from 'express-session';
import connectRedis, { RedisStore } from 'connect-redis';
import redisClient from '../database/redis';

declare module 'express-session' {
  interface Session {
    clientId: string;
    myNum: number;
  }
}

const { NODE_ENV, SESSION_SECRET } = process.env;

const RedisStore: RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({ client: redisClient }),
  // @ts-ignore
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: 'sessionId',
  cookie: {
    secure: NODE_ENV === 'production' ? true : false, // Only send the cookie back if the connections is https
    httpOnly: true, // If true, prevents tahr client side js from reading the cookie
    maxAge: 1000 * 60 * 30, // Session max ege in m-seconds
  },
});
