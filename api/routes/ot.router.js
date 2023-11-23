import express from 'express';
import {
  createOtherTrip,
  getAllOtherTrips,
  viewOtherTripsByDateRange,
  
} from '../controllers/ot.controller.js';

const otRouter = express.Router();

// Create a new OtherTrip
otRouter.post('/create-other-trip', createOtherTrip);

// Get all OtherTrips
otRouter.get('/other-trips', getAllOtherTrips);

otRouter.post('/viewByDateRange', viewOtherTripsByDateRange);



export default otRouter;
