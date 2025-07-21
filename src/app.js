import express from 'express';
import mongoose  from 'mongoose';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));//لتسجيل تفاصيل كل طلب HTTP يصل إلى السيرفر

// Test route
app.get('/', (req, res) => {
  res.send('Money Transfer API');
});

export default app;