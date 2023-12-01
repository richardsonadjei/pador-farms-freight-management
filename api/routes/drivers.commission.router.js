import express from 'express';
import {
  

  createOTDriverCommission,
  createPEDriverCommission,
  getDriverCommissionById,
  getDriverCommissionsByFirstNameAndPeriod,
  
} from '../controllers/drivers.commission.controller.js';

const dcommissionRouter = express.Router();

// Create a new driver's commission
dcommissionRouter.post('/pe-driver-commissions', createPEDriverCommission);
dcommissionRouter.post('/ot-driver-commissions', createOTDriverCommission);

// Get all driver's commissions
dcommissionRouter.get('/driver-commissions', getDriverCommissionsByFirstNameAndPeriod);

// Get a specific driver's commission by ID
dcommissionRouter.get('/driver-commissions/:id', getDriverCommissionById);



export default dcommissionRouter;
