import express from 'express';
import { getAllOtherTripIncome, getIncomeReport, viewPEincomeByDateRange } from '../controllers/reports.controller.js';

const reportsRouter = express.Router();

// Route to get income report within a date range
reportsRouter.post('/all-incomeReport', getIncomeReport);
reportsRouter.post('/all-pe-incomeReport', viewPEincomeByDateRange);
reportsRouter.post('/all-ot-incomeReport', getAllOtherTripIncome);

export default reportsRouter;
