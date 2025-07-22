// src/transfers/transfer.route.js
import express from 'express';
import validateTokenMW from '../middlewares/validate-token.js';
import wrapper from '../shared/wrapper.js';
import {
  makeTransfer,
  getMyTransfers,
  getAllTransfers,
} from './transfer.controller.js';
import validateTransferMW from '../middlewares/validate-transfer.js';
import NotAuthorizedError from '../shared/errors/not-authorized-error.js';

const transferRouter = express.Router();

transferRouter.post('/transfer', validateTokenMW,validateTransferMW, wrapper(makeTransfer));

transferRouter.get('/transfer', validateTokenMW, wrapper(getMyTransfers));

transferRouter.use((request,response,next)=>{// middleware
    if(request.user.role !== 'admin')
         return next(
            new NotAuthorizedError('you don`t have a permission to access to this resource')
    );
    next();
});

transferRouter.get('/transfer/all', validateTokenMW, wrapper(getAllTransfers));

export default transferRouter;
