import express from 'express';
import { createCocoaPrice, createCommission, createExpenseCategory, createPartner, createWeightRecord, deleteCocoaPriceById, deleteCommission, deleteExpenseCategory, deletePartner, deleteWeightRecord, getAllCocoaPrices, getAllCommissions, getAllExpenseCategories, getAllPartners, getAllWeightRecords, getCocoaPriceById, getCommissionById, getExpenseCategoryById, getPartnerById, getWeightRecordById, updateCocoaPriceById, updateCommission, updateExpenseCategory, updatePartner, updateWeightRecord } from '../controllers/extras.controller.js';


const extrasRouter = express.Router();

// Create a new cocoa price record
extrasRouter.post('/cocoa-price', createCocoaPrice);

// Get all cocoa price records
extrasRouter.get('/cocoa-prices', getAllCocoaPrices);

// Get a single cocoa price record by ID
extrasRouter.get('/cocoa-price/:id', getCocoaPriceById);

// Update a cocoa price record by ID
extrasRouter.put('/cocoa-price/:id', updateCocoaPriceById);

// Delete a cocoa price record by ID
extrasRouter.delete('/cocoa-price/:id', deleteCocoaPriceById);

extrasRouter.post('/add-expense-categories', createExpenseCategory);

// Get all expense categories
extrasRouter.get('/all-expense-categories', getAllExpenseCategories);

// Get a single expense category by ID
extrasRouter.get('/expense-categories/:id', getExpenseCategoryById);

// Update an expense category
extrasRouter.put('/edit-expense-categories/:id', updateExpenseCategory);

// Delete an expense category
extrasRouter.delete('/delete-expense-categories/:id', deleteExpenseCategory);

extrasRouter.post('/partners', createPartner); // Create a new partner
extrasRouter.get('/partners', getAllPartners); // Get all partners
extrasRouter.get('/partners/:id', getPartnerById); // Get a partner by ID
extrasRouter.put('/partners/:id', updatePartner); // Update a partner by ID
extrasRouter.delete('/partners/:id', deletePartner); // Delete a partner by ID

// Route to create a new weight record
extrasRouter.post('/weight', createWeightRecord);

// Route to get all weight records
extrasRouter.get('/weight', getAllWeightRecords);

// Route to get a specific weight record by ID
extrasRouter.get('/weight/:id', getWeightRecordById);

// Route to update a weight record by ID
extrasRouter.put('/weight/:id', updateWeightRecord);

// Route to delete a weight record by ID
extrasRouter.delete('/weight/:id', deleteWeightRecord);

// Route to create a new commission record
extrasRouter.post('/pe-commissions', createCommission);

// Route to get all commission records
extrasRouter.get('/pe-commissions', getAllCommissions);

// Route to get a specific commission record by ID
extrasRouter.get('/pe-commissions/:id', getCommissionById);

// Route to update a commission record by ID
extrasRouter.put('/pe-commissions/:id', updateCommission);

// Route to delete a commission record by ID
extrasRouter.delete('/pe-commissions/:id', deleteCommission);

export default extrasRouter;
