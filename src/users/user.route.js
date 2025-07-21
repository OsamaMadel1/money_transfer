import express from 'express';
import {
    addUser,
    deleteUser,
    getAllUsers,
    getUserById, 
    updatePartUser,
    updateWholeUser} from './user.controller.js';
import { validatePartUser, validateWholeUser } from '../validations/validate-user.js';
import NotAuthorizedError from '../shared/errors/not-authorized-error.js';
import wrapper from '../shared/wrapper.js';

const userRouter = express.Router();

const extractUserDataMW = (request,response,next) =>{
    try{
        const user = request.user;
        validateWholeUser(user);

        request.user = user;
        next();
    }catch(e){
        next(e);
    }
}

userRouter.use((request,response,next)=>{// middleware
    if(request.authUser.role !== 'admin')
         return next(
            new NotAuthorizedError('you don`t have a permission to access to this resource')
    );
    next();
});
userRouter.post('/users',wrapper(addUser));

userRouter.get('/users',wrapper(getAllUsers));

userRouter.get('/users/:id',wrapper(getUserById));

userRouter.put('/users/:id',extractUserDataMW,wrapper(updateWholeUser));

userRouter.patch('/users/:id',validatePartUser,wrapper(updatePartUser))

userRouter.delete('/users/:id',wrapper(deleteUser));


export default userRouter;






