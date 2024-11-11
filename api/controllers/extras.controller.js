import ExpenseCategory from "../models/expenseCategory.model.js";
import Partner from "../models/partner.model.js";
import PEDriversCommission from "../models/pEsDriversCommission.model.js";
import CocoaPricePerBag from "../models/pricePerBag.model.js";
import WeightPerBag from "../models/standardWeight.model.js";


// Create a new cocoa price record
export const createCocoaPrice = async (req, res, next) => {
  const {
    date,
    pricePerBagBeforeTax,
    pricePerBagAfterTax,
    haulageCompany,
    currency,
    notes,
  } = req.body;

  try {
    const newCocoaPrice = new CocoaPricePerBag({
      date,
      pricePerBagBeforeTax,
      pricePerBagAfterTax,
      haulageCompany,
      currency,
      notes,
    });

    const savedCocoaPrice = await newCocoaPrice.save();
    res.status(201).json({ success: true, data: savedCocoaPrice });
  } catch (error) {
    console.error('Error creating cocoa price:', error);
    next(error);
  }
};


// Get all cocoa price records
export const getAllCocoaPrices = async (req, res, next) => {
  try {
    const cocoaPrices = await CocoaPricePerBag.find();
    res.status(200).json({ success: true, data: cocoaPrices });
  } catch (error) {
    console.error('Error fetching cocoa prices:', error);
    next(error);
  }
};

// Get a single cocoa price record by ID
export const getCocoaPriceById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cocoaPrice = await CocoaPricePerBag.findById(id);
    if (!cocoaPrice) {
      return res.status(404).json({ success: false, message: 'Cocoa price not found' });
    }
    res.status(200).json({ success: true, data: cocoaPrice });
  } catch (error) {
    console.error('Error fetching cocoa price by ID:', error);
    next(error);
  }
};

// Update a cocoa price record by ID
export const updateCocoaPriceById = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCocoaPrice = await CocoaPricePerBag.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCocoaPrice) {
      return res.status(404).json({ success: false, message: 'Cocoa price not found' });
    }

    res.status(200).json({ success: true, data: updatedCocoaPrice });
  } catch (error) {
    console.error('Error updating cocoa price:', error);
    next(error);
  }
};

// Delete a cocoa price record by ID
export const deleteCocoaPriceById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCocoaPrice = await CocoaPricePerBag.findByIdAndDelete(id);
    if (!deletedCocoaPrice) {
      return res.status(404).json({ success: false, message: 'Cocoa price not found' });
    }

    res.status(200).json({ success: true, message: 'Cocoa price deleted successfully' });
  } catch (error) {
    console.error('Error deleting cocoa price:', error);
    next(error);
  }
};


// Controller to create a new expense category
export const createExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const expenseCategory = new ExpenseCategory({ name, description });
    const newExpenseCategory = await expenseCategory.save();
    res.status(201).json(newExpenseCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all expense categories
export const getAllExpenseCategories = async (req, res) => {
  try {
    const expenseCategories = await ExpenseCategory.find();
    res.status(200).json(expenseCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single expense category by ID
export const getExpenseCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseCategory = await ExpenseCategory.findById(id);
    if (!expenseCategory) {
      return res.status(404).json({ message: 'Expense category not found' });
    }
    res.status(200).json(expenseCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an expense category
export const updateExpenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.status(200).json(updatedExpenseCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an expense category
export const deleteExpenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpenseCategory = await ExpenseCategory.findByIdAndDelete(id);
    if (!deletedExpenseCategory) {
      return res.status(404).json({ message: 'Expense category not found' });
    }
    res.status(200).json({ message: 'Expense category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create a new partner
export const createPartner = async (req, res) => {
  try {
    const { name, phone, partnershipDate, contribution, notes } = req.body;

    // Create a new partner instance
    const newPartner = new Partner({
      name,
      phone,
      partnershipDate,
      contribution,
      notes,
    });

    // Save the partner to the database
    await newPartner.save();

    res.status(201).json({
      success: true,
      data: newPartner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all partners
export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();

    res.status(200).json({
      success: true,
      data: partners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a partner by ID
export const getPartnerById = async (req, res) => {
  try {
    const { id } = req.params;

    const partner = await Partner.findById(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    res.status(200).json({
      success: true,
      data: partner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a partner by ID
export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, partnershipDate, contribution, notes } = req.body;

    // Find the partner by ID and update the fields
    const updatedPartner = await Partner.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        partnershipDate,
        contribution,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedPartner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a partner by ID
export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPartner = await Partner.findByIdAndDelete(id);

    if (!deletedPartner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// Create a new weight record
export const createWeightRecord = async (req, res, next) => {
  const { date, weight } = req.body;

  try {
    const newRecord = new WeightPerBag({ date, weight });
    const savedRecord = await newRecord.save();
    res.status(201).json({ success: true, data: savedRecord });
  } catch (error) {
    console.error('Error creating weight record:', error);
    next(error);
  }
};

// Get all weight records
export const getAllWeightRecords = async (req, res, next) => {
  try {
    const records = await WeightPerBag.find();
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error('Error fetching weight records:', error);
    next(error);
  }
};

// Get a specific weight record by ID
export const getWeightRecordById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const record = await WeightPerBag.findById(id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error('Error fetching weight record:', error);
    next(error);
  }
};

// Update a weight record by ID
export const updateWeightRecord = async (req, res, next) => {
  const { id } = req.params;
  const { date, weight } = req.body;

  try {
    const updatedRecord = await WeightPerBag.findByIdAndUpdate(
      id,
      { date, weight },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, data: updatedRecord });
  } catch (error) {
    console.error('Error updating weight record:', error);
    next(error);
  }
};

// Delete a weight record by ID
export const deleteWeightRecord = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRecord = await WeightPerBag.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting weight record:', error);
    next(error);
  }
};




// Create a new driver's commission record
export const createCommission = async (req, res, next) => {
  const { date, amount } = req.body;

  try {
    const newCommission = new PEDriversCommission({ date, amount });
    const savedCommission = await newCommission.save();
    res.status(201).json({ success: true, data: savedCommission });
  } catch (error) {
    console.error('Error creating commission record:', error);
    next(error);
  }
};

// Get all driver's commission records
export const getAllCommissions = async (req, res, next) => {
  try {
    const commissions = await PEDriversCommission.find();
    res.status(200).json({ success: true, data: commissions });
  } catch (error) {
    console.error('Error fetching commission records:', error);
    next(error);
  }
};

// Get a specific driver's commission record by ID
export const getCommissionById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const commission = await PEDriversCommission.findById(id);
    if (!commission) {
      return res.status(404).json({ success: false, message: 'Commission record not found' });
    }
    res.status(200).json({ success: true, data: commission });
  } catch (error) {
    console.error('Error fetching commission record:', error);
    next(error);
  }
};

// Update a driver's commission record by ID
export const updateCommission = async (req, res, next) => {
  const { id } = req.params;
  const { date, amount } = req.body;

  try {
    const updatedCommission = await PEDriversCommission.findByIdAndUpdate(
      id,
      { date, amount },
      { new: true, runValidators: true }
    );

    if (!updatedCommission) {
      return res.status(404).json({ success: false, message: 'Commission record not found' });
    }

    res.status(200).json({ success: true, data: updatedCommission });
  } catch (error) {
    console.error('Error updating commission record:', error);
    next(error);
  }
};

// Delete a driver's commission record by ID
export const deleteCommission = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCommission = await PEDriversCommission.findByIdAndDelete(id);
    if (!deletedCommission) {
      return res.status(404).json({ success: false, message: 'Commission record not found' });
    }
    res.status(200).json({ success: true, message: 'Commission record deleted successfully' });
  } catch (error) {
    console.error('Error deleting commission record:', error);
    next(error);
  }
};
