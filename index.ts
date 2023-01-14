import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
declare module 'express-session' {
  interface Session {
    clientId: string;
    myNum: number;
  }
}
import connectRedis, { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import cors from 'cors';

dotenv.config();
const { NODE_ENV, PORT, SESSION_SECRET } = process.env;

// redis config
const RedisStore: RedisStore = connectRedis(session);
const redisClient = createClient({
  url: 'redis://localhost:6379',
});
redisClient
  .connect()
  .then((data) => {
    console.log('redis connected');
  })
  .catch((error) => {
    console.log('There was a problem connection to redis database.');
    throw error;
  });

// app config
const app: Express = express();
app.use(express.json());
app.use(cors());

// If the app runs behind a proxy (e.g nginx) because the behind proxy request
// wont be https. It probably be http.
app.set('trust proxy', 1);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    // @ts-ignore
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: NODE_ENV === 'production' ? true : false, // Only send the cookie back if the connections is https
      httpOnly: true, // If true, prevents tahr client side js from reading the cookie
      maxAge: 1000 * 60 * 30, // Session max ege in m-seconds
    },
  })
);

app.get('/public', (req: Request, res: Response) => {
  res.send('Public route');
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);

  // Assume that the credentials are correct.
  req.session.clientId = 'asd123';
  req.session.myNum = 1;

  res.status(200).json({ message: 'Logged in successfully' });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.clientId) {
    return res
      .status(401)
      .json({ success: false, error: true, message: 'You mas be logged in' });
  }
  next();
});

app.get('/private', (req: Request, res: Response) => {
  res.send('Private route');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
