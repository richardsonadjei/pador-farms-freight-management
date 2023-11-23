import express from 'express';
import { recordOtherTripExpenditure } from '../controllers/ot.expenditure.controller.js';

const otExpenseRouter = express.Router();

// Route to record other trip expenditure
otExpenseRouter .post('/ot-expenditure', recordOtherTripExpenditure);

export default otExpenseRouter ;
