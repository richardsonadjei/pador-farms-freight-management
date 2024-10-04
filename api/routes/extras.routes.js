import express from 'express';
import { createCocoaPrice, createExpenseCategory, createPartner, deleteCocoaPriceById, deleteExpenseCategory, deletePartner, getAllCocoaPrices, getAllExpenseCategories, getAllPartners, getCocoaPriceById, getExpenseCategoryById, getPartnerById, updateCocoaPriceById, updateExpenseCategory, updatePartner } from '../controllers/extras.controller.js';


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

export default extrasRouter;
