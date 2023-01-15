import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import cors from 'cors';
import router from './routes';
import session from './middlewares/session';

const { PORT } = process.env;

// app config
const app: Express = express();
// If the app runs behind a proxy (e.g nginx) because the behind proxy request
// wont be https. It probably be http.
// app.set('trust proxy', 1);

app.use(express.json());
app.use(cors());
app.use(session);
app.use(router);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
