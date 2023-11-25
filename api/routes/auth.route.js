import express from 'express';
import { registerUser, signin, signout, updateUser } from '../controllers/auth.controller.js';
import {  verifyToken } from '../utils/verifyUser.js';

const authRouter = express.Router();

// Route for user registration
authRouter.post('/register', registerUser);
authRouter.post('/sign-in', signin);
authRouter.post('/sign-out', signout);
authRouter.post('/user/:id', verifyToken, updateUser);

export default authRouter;
