import express from 'express';
import { createVehicle, deleteVehicle, getAllVehicles, getVehicleById, updateVehicle } from '../controllers/vehicle.controller.js';


const vehicleRouter = express.Router();

// Create a new vehicle
vehicleRouter.post('/vehicle', createVehicle);

// Get all vehicles
vehicleRouter.get('/vehicle', getAllVehicles);

// Get a single vehicle by ID
vehicleRouter.get('/vehicle/:id', getVehicleById);

// Update a vehicle by ID
vehicleRouter.put('/vehicle/:id', updateVehicle);

// Delete a vehicle by ID
vehicleRouter.delete('/vehicle/:id', deleteVehicle);

export default vehicleRouter;
