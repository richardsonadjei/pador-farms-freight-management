// paymentRouter.js
import express from 'express';
import {
  createPartnerPayment,
  getPartnerPayments,
  getPaymentsByNameAndPeriod ,
  
} from '../controllers/partnerShares.js'; // Update the path

const partnerRouter = express.Router();

// Create a new payment
partnerRouter.post('/shares-payments', createPartnerPayment);

// Get all payments
partnerRouter.get('/all-payments', getPartnerPayments);

// Get a single payment by ID
partnerRouter.get('/partner-payments', getPaymentsByNameAndPeriod );



export default partnerRouter;
