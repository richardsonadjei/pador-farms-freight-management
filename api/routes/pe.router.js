import express from 'express';
import { createCocoaHaulage } from '../controllers/pe.controller.js';

const peRouter = express.Router();

// Route for CocoaHaulage
peRouter.post('/record-pe', createCocoaHaulage);

export default peRouter;