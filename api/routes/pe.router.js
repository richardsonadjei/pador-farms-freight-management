import express from 'express';
import { createCocoaHaulage, viewAllPEs, viewPEsByDateRange } from '../controllers/pe.controller.js';

const peRouter = express.Router();

// Route for CocoaHaulage
peRouter.post('/record-pe', createCocoaHaulage);
peRouter.get('/all-pe', viewAllPEs);
peRouter.post('/viewPEsByDateRange', viewPEsByDateRange);

export default peRouter;