import express from 'express';
import {
  createCocoaHaulage,
  viewAllPEs,
  viewPEsByDateRange,
  updateCocoaHaulage,
  deleteCocoaHaulage,
} from '../controllers/pe.controller.js';

const peRouter = express.Router();

// Routes for CocoaHaulage
peRouter.post('/record-pe', createCocoaHaulage);
peRouter.get('/all-pe', viewAllPEs);
peRouter.post('/viewPEsByDateRange', viewPEsByDateRange);

// Use /update-pe/:peNumber for updating
peRouter.put('/update-pe/:peNumber', updateCocoaHaulage);

// Use /delete-pe/:peNumber for deleting
peRouter.delete('/delete-pe/:peNumber', deleteCocoaHaulage);

export default peRouter;
