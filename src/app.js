import express from 'express';
import mongoose  from 'mongoose';
import morgan from 'morgan';
import authRouter from './auth/auth.route.js';
import userRouter from './users/user.route.js';
import settingsRepositoryMiddlewares from './middlewares/settings-repository-middlewares.js';
import errorHandler from './middlewares/error-handler.js';
import validateToken from './middlewares/validate-token.js';
import transferRouter from './transfer/transfer.route.js';

const app = express();

// Middlewares
app.use(express.json());//middleware : data in body
app.use(morgan('dev'));//لتسجيل تفاصيل كل طلب HTTP يصل إلى السيرفر
app.use(settingsRepositoryMiddlewares);

app.use('/',authRouter);

app.use(validateToken);//middleware

app.use('/',transferRouter)
app.use('/',userRouter);



app.use(errorHandler);
export default app;