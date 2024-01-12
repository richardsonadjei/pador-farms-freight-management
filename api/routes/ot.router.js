import express from 'express';
import {
  createOtherTrip,
  deleteOtherTrip,
  getAllOtherTrips,
  updateOtherTrip,
  viewOtherTripsByDateRange,
  
} from '../controllers/ot.controller.js';

const otRouter = express.Router();

// Create a new OtherTrip
otRouter.post('/create-other-trip', createOtherTrip);

// Get all OtherTrips
otRouter.get('/other-trips', getAllOtherTrips);

otRouter.post('/viewByDateRange', viewOtherTripsByDateRange);

otRouter.put('/update-trip/:tripNumber', updateOtherTrip);
otRouter.delete('/delete-trip/:tripNumber', deleteOtherTrip);



export default otRouter;
