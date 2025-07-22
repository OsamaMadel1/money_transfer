import express from 'express';
import {
    addUser,
    deleteUser,
    getAllUsers,
    getCurrentBalance,
    getUserById, 
    updatePartUser,
    updateWholeUser} from './user.controller.js';
import { validatePartUser, validateWholeUser } from '../validations/validate-user.js';
import NotAuthorizedError from '../shared/errors/not-authorized-error.js';
import wrapper from '../shared/wrapper.js';

const userRouter = express.Router();

const validateWholeUserMW = (request,response,next) =>{
    try{
        const user = request.user;
        validateWholeUser(user);

        request.user = user;
        next();
    }catch(e){
        next(e);
    }
}

function validatePartUserMW(request,response,next) {
    try {
        validatePartUser(request.body);
        next();
    } catch (error) {
        next(error); 
    }
}

const authSameIdentityOrAdminMW = (request,response,next)=>{
    if(
        request.user._id.toString() !== request.params.userId && 
        request.user.role !== 'admin' 
    )
    return next(new NotAuthorizedError('you don`t have a permission to access to this resource'));

    next();
}

userRouter.get('/users/balance/:id',authSameIdentityOrAdminMW,wrapper(getCurrentBalance));

userRouter.use((request,response,next)=>{// middleware
    if(request.user.role !== 'admin')
         return next(
            new NotAuthorizedError('you don`t have a permission to access to this resource')
    );
    next();
});
userRouter.post('/users',wrapper(addUser));

userRouter.get('/users',wrapper(getAllUsers));

userRouter.get('/users/:id',wrapper(getUserById));

userRouter.put('/users/:id',validateWholeUserMW,wrapper(updateWholeUser));

userRouter.patch('/users/:id',validatePartUserMW,wrapper(updatePartUser))

userRouter.delete('/users/:id',wrapper(deleteUser));


export default userRouter;






