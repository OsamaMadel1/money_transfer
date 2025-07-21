import express from 'express';
import {
    addUser,
    deleteUser,
    getAllUsers, getUserById, 
    updatePartUser,
    updateWholeUser} from './user.controller.js';

const userRouter = express.Router();


userRouter.post('/users',addUser);

userRouter.get('/users',getAllUsers);

userRouter.get('/users/:id',getUserById);

userRouter.put('/users/:id',updateWholeUser);

userRouter.patch('/users/:id',updatePartUser)

userRouter.delete('/users/:id',deleteUser);


export default userRouter;






