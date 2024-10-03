import express from 'express';
import { createGeneralExpense, createOtherTrip, createOtherTripExpense, createPrimaryEvacuation, createPrimaryEvacuationExpense, deleteGeneralExpense, deleteOtherTrip, deleteOtherTripExpense, deletePrimaryEvacuation, deletePrimaryEvacuationExpense, getAllActivitiesAndTransactionsRecords, getAllFinancialRecordsGroupedByVehicle, getAllGeneralExpenses, getAllOtherTripExpenses, getAllOtherTrips, getAllPrimaryEvacuationExpenses, getAllPrimaryEvacuations, getGeneralExpenseById, getOtherTripById, getOtherTripExpenseById, getPrimaryEvacuationById, getPrimaryEvacuationExpenseById, updateGeneralExpense, updateOtherTrip, updateOtherTripExpense, updatePrimaryEvacuation, updatePrimaryEvacuationExpense } from '../controllers/haulingsAndFinance.controller.js';


const haulingsAndFinanceRouter = express.Router();

// Route to create a new primary evacuation record
haulingsAndFinanceRouter.post('/primary-evacuation', createPrimaryEvacuation);

// Route to get all primary evacuation records
haulingsAndFinanceRouter.get('/primary-evacuations', getAllPrimaryEvacuations);

// Route to get a specific primary evacuation record by ID
haulingsAndFinanceRouter.get('/primary-evacuation/:id', getPrimaryEvacuationById);

// Route to update a specific primary evacuation record by ID
haulingsAndFinanceRouter.put('/primary-evacuation/:id', updatePrimaryEvacuation);

// Route to delete a specific primary evacuation record by ID
haulingsAndFinanceRouter.delete('/primary-evacuation/:id', deletePrimaryEvacuation);

// Create a new other trip
haulingsAndFinanceRouter.post('/other-trip', createOtherTrip);

// Get all other trips
haulingsAndFinanceRouter.get('/other-trips', getAllOtherTrips);

// Get a specific other trip by ID
haulingsAndFinanceRouter.get('/other-trip/:id', getOtherTripById);

// Update an existing other trip by ID
haulingsAndFinanceRouter.put('/other-trip/:id', updateOtherTrip);

// Delete an other trip by ID
haulingsAndFinanceRouter.delete('/other-trip/:id', deleteOtherTrip);

// Create a new primary evacuation expense
haulingsAndFinanceRouter.post('/primary-evacuation-expense', createPrimaryEvacuationExpense);

// Get all primary evacuation expenses
haulingsAndFinanceRouter.get('/primary-evacuation-expenses', getAllPrimaryEvacuationExpenses);

// Get a specific primary evacuation expense by ID
haulingsAndFinanceRouter.get('/primary-evacuation-expense/:id', getPrimaryEvacuationExpenseById);

// Update an existing primary evacuation expense by ID
haulingsAndFinanceRouter.put('/primary-evacuation-expense/:id', updatePrimaryEvacuationExpense);

// Delete a primary evacuation expense by ID
haulingsAndFinanceRouter.delete('/primary-evacuation-expense/:id', deletePrimaryEvacuationExpense);

// Create a new other trip expense
haulingsAndFinanceRouter.post('/other-trip-expense', createOtherTripExpense);
// Get all other trip expenses
haulingsAndFinanceRouter.get('/other-trip-expenses', getAllOtherTripExpenses);
// Get a specific other trip expense by ID
haulingsAndFinanceRouter.get('/other-trip-expense/:id', getOtherTripExpenseById);
// Update an existing other trip expense by ID
haulingsAndFinanceRouter.put('/other-trip-expense/:id', updateOtherTripExpense);
// Delete an other trip expense by ID
haulingsAndFinanceRouter.delete('/other-trip-expense/:id', deleteOtherTripExpense);


// Route to create a new general expense
haulingsAndFinanceRouter.post('/general-expenses', createGeneralExpense);

// Route to get all general expenses
haulingsAndFinanceRouter.get('/general-expenses', getAllGeneralExpenses);

// Route to get a specific general expense by ID
haulingsAndFinanceRouter.get('/general-expenses/:id', getGeneralExpenseById);

// Route to update a specific general expense by ID
haulingsAndFinanceRouter.put('/general-expenses/:id', updateGeneralExpense);

// Route to delete a specific general expense by ID
haulingsAndFinanceRouter.delete('/general-expenses/:id', deleteGeneralExpense);

haulingsAndFinanceRouter.get('/all-records', getAllActivitiesAndTransactionsRecords);

haulingsAndFinanceRouter.get('/financial-records/grouped-by-vehicle', getAllFinancialRecordsGroupedByVehicle);


export default haulingsAndFinanceRouter;
