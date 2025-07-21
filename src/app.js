import express from 'express';
import mongoose  from 'mongoose';
import morgan from 'morgan';
import authRouter from './auth/auth.route.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));//لتسجيل تفاصيل كل طلب HTTP يصل إلى السيرفر

// Test route
app.use('/',authRouter);

export default app;