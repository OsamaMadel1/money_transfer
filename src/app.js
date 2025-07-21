import express from 'express';
import mongoose  from 'mongoose';
import morgan from 'morgan';
import authRouter from './auth/auth.route.js';
import userRouter from './users/user.route.js';
import settingsRepositoryMiddlewares from './middlewares/settings-repository-middlewares.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));//لتسجيل تفاصيل كل طلب HTTP يصل إلى السيرفر
app.use(settingsRepositoryMiddlewares);

// Test route
app.use('/',authRouter);
app.use('/',userRouter);

export default app;