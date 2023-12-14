// routes/vehicleRoutes.js
import express from 'express';
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
} from '../controllers/vehicle.controller.js';

const vehicleRouter = express.Router();

// Route to create a new vehicle
vehicleRouter.post('/register-vehicle', createVehicle);

// Route to get all vehicles
vehicleRouter.get('/all-vehicles', getAllVehicles);

// Route to get a single vehicle by ID
vehicleRouter.get('/vehicle/:id', getVehicleById);

// Route to update a vehicle by ID
vehicleRouter.put('/update-vehicle/:id', updateVehicleById);

// Route to delete a vehicle by ID
vehicleRouter.delete('/delete-vehicle/:id', deleteVehicleById);

export default vehicleRouter;
