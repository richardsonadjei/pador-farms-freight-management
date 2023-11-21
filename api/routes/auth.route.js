import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// Route for user registration
authRouter.post('/register', registerUser);

export default authRouter;
