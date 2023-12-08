import express from 'express';
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriverById,
  deleteDriverById,
} from '../controllers/driver.controller.js';

const driverRouter = express.Router();

// Create a new driver
driverRouter.post('/register-driver', createDriver);

// Get all drivers
driverRouter.get('/all-drivers', getAllDrivers);

// Get a single driver by ID
driverRouter.get('/drivers/:id', getDriverById);

// Update a driver by ID
driverRouter.put('/update-drivers/:id', updateDriverById);

// Delete a driver by ID
driverRouter.delete('/drivers/:id', deleteDriverById);

export default driverRouter;