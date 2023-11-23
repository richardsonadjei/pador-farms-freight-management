import express from 'express';
import { getAllOtherTripIncome, getIncomeReport,  viewFuelPEExpenditures, viewPEincomeByDateRange } from '../controllers/reports.controller.js';

const reportsRouter = express.Router();

// Route to get income report within a date range
reportsRouter.post('/all-incomeReport', getIncomeReport);
reportsRouter.post('/all-pe-incomeReport', viewPEincomeByDateRange);
reportsRouter.post('/all-ot-incomeReport', getAllOtherTripIncome);
reportsRouter.get('/all-fuelPE-expenseReport', viewFuelPEExpenditures);

export default reportsRouter;
