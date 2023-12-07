import express from 'express';
import {
  

  calculateDriverCommissionForCocoaHaulages,
  calculateExpectedOtherTripCommission,
  createMonthlyPEDriverCommission,
  createOTDriverCommission,
  createPEDriverCommission,
  getDriverCommissionById,
  getDriverCommissionsByFirstNameAndPeriod,
  
} from '../controllers/drivers.commission.controller.js';

const dcommissionRouter = express.Router();

// Create a new driver's commission
dcommissionRouter.post('/pe-driver-commissions', createPEDriverCommission);
dcommissionRouter.post('/pe-monthly-driver-commissions', createMonthlyPEDriverCommission);
dcommissionRouter.post('/ot-driver-commissions', createOTDriverCommission);
dcommissionRouter.get('/expected-ot-driver-commissions', calculateExpectedOtherTripCommission);


// Get all driver's commissions
dcommissionRouter.get('/driver-commissions', getDriverCommissionsByFirstNameAndPeriod);

// Get a specific driver's commission by ID
dcommissionRouter.get('/driver-commissions/:id', getDriverCommissionById);
dcommissionRouter.get('/expected-pe-drivers-commission', calculateDriverCommissionForCocoaHaulages);



export default dcommissionRouter;
