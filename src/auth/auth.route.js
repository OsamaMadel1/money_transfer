import express from 'express';
import { registerUser, loginUser } from './auth.controller.js';
import wrapper from '../shared/wrapper.js';

const authRouter = express.Router();

authRouter.post('/register', wrapper(registerUser));

authRouter.post('/login', wrapper(loginUser));

export default authRouter;