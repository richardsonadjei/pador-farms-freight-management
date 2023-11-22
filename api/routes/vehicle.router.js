// routes/vehicleRoutes.js
import express from 'express';
import {
  createVehicle,
  getAllVehicles,
  getVehicleByRegistrationNumber,
  updateVehicleStatus,
} from '../controllers/vehicle.controller.js';

const vehicleRouter = express.Router();

// Route to create a new vehicle
vehicleRouter.post('/register-vehicle', createVehicle);

// Route to get all vehicles
vehicleRouter.get('/vehicles', getAllVehicles);

// Route to get a specific vehicle by registration number
vehicleRouter.get('/vehicles/:registrationNumber', getVehicleByRegistrationNumber);

// Route to update the status of a vehicle
vehicleRouter.put('/vehicles/:registrationNumber/status', updateVehicleStatus);

export default vehicleRouter;
