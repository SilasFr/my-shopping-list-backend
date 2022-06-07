import cookieSession from 'cookie-session';
import session from 'express-session';
import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routers/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import passport from 'passport';
import './passport.js';

const app = express();

app.use(
  cookieSession({ name: 'session', keys: ['lama'], maxAge: 24 * 60 * 60 * 100 })
);

// app.use(session({ secret: 'my-secret' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(router);
app.use('/auth', authRouter);
app.use(errorHandlerMiddleware);

export default app;
