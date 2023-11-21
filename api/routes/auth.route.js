import express from 'express';
import { registerUser, signin } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Route for user registration
authRouter.post('/register', registerUser);
authRouter.post('/sign-in', signin);

export default authRouter;
