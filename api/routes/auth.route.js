import express from 'express';
import { registerUser, signin, signout } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Route for user registration
authRouter.post('/register', registerUser);
authRouter.post('/sign-in', signin);
authRouter.post('/sign-out', signout);

export default authRouter;
