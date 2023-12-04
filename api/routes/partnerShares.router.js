// paymentRouter.js
import express from 'express';
import {
  createPartnerPayment,
  getPartnerPayments,
  getPaymentById,
  
} from '../controllers/partnerShares.js'; // Update the path

const partnerRouter = express.Router();

// Create a new payment
partnerRouter.post('/shares-payments', createPartnerPayment);

// Get all payments
partnerRouter.get('/all-payments', getPartnerPayments);

// Get a single payment by ID
partnerRouter.get('/payments/:id', getPaymentById);



export default partnerRouter;
