import GeneralExpense from "../models/generalExpense.model.js";
import Income from "../models/income.model.js";
import insuranceModel from "../models/insurance.model.js";
import OtherTrip from "../models/otherTrips.model.js";
import OtherTripExpense from "../models/otherTripsExpense.model.js";
import Partner from "../models/partner.model.js";
import PrimaryEvacuation from "../models/pe.model.js";
import PrimaryEvacuationExpense from "../models/pEexpense.model.js";
import CocoaPricePerBag from "../models/pricePerBag.model.js";
import roadworthyModel from "../models/roadworthy.model.js";
import Transfer from "../models/transfers.model.js";
import Vehicle from "../models/vehicle.model.js";




export const createPrimaryEvacuation = async (req, res, next) => {
  const {
    cocoaPricePerBag,
    vehicle,
    driver,
    overallWeight,
    dateOfEvacuation,
    evacuationLocation,
    notes,
    recordedBy,
  } = req.body;

  try {
    // Calculate the number of bags based on the overall weight and round to 2 decimal places
    if (!overallWeight || overallWeight < 1) {
      return res.status(400).json({ success: false, message: 'Invalid overall weight' });
    }

    const numberOfBags = parseFloat((overallWeight / 63.3).toFixed(2));

    // Find the cocoa price per bag record to calculate the income
    const cocoaPrice = await CocoaPricePerBag.findById(cocoaPricePerBag);
    if (!cocoaPrice) {
      return res.status(404).json({ success: false, message: 'Cocoa price not found' });
    }

    // Calculate the income amount
    const incomeAmount = parseFloat((cocoaPrice.pricePerBagAfterTax * numberOfBags).toFixed(4));

    // Create the Primary Evacuation record
    const newEvacuation = new PrimaryEvacuation({
      cocoaPricePerBag,
      vehicle,
      driver,
      numberOfBags,
      overallWeight,
      dateOfEvacuation,
      evacuationLocation,
      notes,
      recordedBy,
    });

    const savedEvacuation = await newEvacuation.save();

    // Create the Income record associated with the vehicle
    const newIncome = new Income({
      source: 'Primary Evacuation',
      vehicle, // Associate the income with the vehicle
      amount: incomeAmount,
      currency: cocoaPrice.currency,
      date: dateOfEvacuation,
      recordedBy,
      notes: `Income from primary evacuation of ${numberOfBags} bags`,
    });

    const savedIncome = await newIncome.save();

    res.status(201).json({
      success: true,
      data: {
        evacuation: savedEvacuation,
        income: savedIncome,
      },
    });
  } catch (error) {
    console.error('Error creating primary evacuation:', error);
    next(error);
  }
};




// Get all primary evacuation records
export const getAllPrimaryEvacuations = async (req, res, next) => {
  try {
    const evacuations = await PrimaryEvacuation.find()
      .populate('cocoaPricePerBag', 'pricePerBagAfterTax currency')
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName')
      .populate('recordedBy', 'userName');
    res.status(200).json({ success: true, data: evacuations });
  } catch (error) {
    console.error('Error fetching primary evacuations:', error);
    next(error);
  }
};

// Get a primary evacuation record by ID
export const getPrimaryEvacuationById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const evacuation = await PrimaryEvacuation.findById(id)
      .populate('cocoaPricePerBag', 'pricePerBagAfterTax currency')
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName')
      .populate('recordedBy', 'userName');

    if (!evacuation) {
      return res.status(404).json({ success: false, message: 'Primary evacuation not found' });
    }

    res.status(200).json({ success: true, data: evacuation });
  } catch (error) {
    console.error('Error fetching primary evacuation by ID:', error);
    next(error);
  }
};

// Update a primary evacuation record by ID
export const updatePrimaryEvacuation = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEvacuation = await PrimaryEvacuation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvacuation) {
      return res.status(404).json({ success: false, message: 'Primary evacuation not found' });
    }

    res.status(200).json({ success: true, data: updatedEvacuation });
  } catch (error) {
    console.error('Error updating primary evacuation:', error);
    next(error);
  }
};

// Delete a primary evacuation record by ID
export const deletePrimaryEvacuation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedEvacuation = await PrimaryEvacuation.findByIdAndDelete(id);

    if (!deletedEvacuation) {
      return res.status(404).json({ success: false, message: 'Primary evacuation not found' });
    }

    res.status(200).json({ success: true, message: 'Primary evacuation deleted successfully' });
  } catch (error) {
    console.error('Error deleting primary evacuation:', error);
    next(error);
  }
};




export const createOtherTrip = async (req, res, next) => {
  const {
    vehicle,
    driver,
    purpose,
    startLocation,
    endLocation,
    dateOfTrip,
    recordedBy,
    notes,
    incomeAmount,
  } = req.body;

  try {
    // Create the new OtherTrip record
    const newTrip = new OtherTrip({
      vehicle,
      driver,
      purpose,
      startLocation,
      endLocation,
      dateOfTrip,
      recordedBy,
      notes,
    });

    const savedTrip = await newTrip.save();

    // Create the corresponding Income record
    const newIncome = new Income({
      vehicle,
      source: 'Other Trips',
      amount: incomeAmount,
      recordedBy,
      notes: purpose, // Use the purpose as notes for the income record
    });

    const savedIncome = await newIncome.save();

    res.status(201).json({ success: true, data: { savedTrip, savedIncome } });
  } catch (error) {
    console.error('Error creating other trip and income:', error);
    next(error);
  }
};




// Get all other trips
export const getAllOtherTrips = async (req, res, next) => {
  try {
    const trips = await OtherTrip.find()
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName');
    res.status(200).json({ success: true, data: trips });
  } catch (error) {
    console.error('Error fetching other trips:', error);
    next(error);
  }
};

// Get a specific other trip by ID
export const getOtherTripById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const trip = await OtherTrip.findById(id)
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName');
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    console.error('Error fetching other trip:', error);
    next(error);
  }
};

// Update an existing other trip by ID
export const updateOtherTrip = async (req, res, next) => {
  const { id } = req.params;
  const {
    vehicle,
    driver,
    purpose,
    startLocation,
    endLocation,
    dateOfTrip,
    recordedBy,
    notes,
  } = req.body;

  try {
    const updatedTrip = await OtherTrip.findByIdAndUpdate(
      id,
      {
        vehicle,
        driver,
        purpose,
        startLocation,
        endLocation,
        dateOfTrip,
        recordedBy,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    res.status(200).json({ success: true, data: updatedTrip });
  } catch (error) {
    console.error('Error updating other trip:', error);
    next(error);
  }
};

// Delete an other trip by ID
export const deleteOtherTrip = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTrip = await OtherTrip.findByIdAndDelete(id);

    if (!deletedTrip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    res.status(200).json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting other trip:', error);
    next(error);
  }
};




// Create a new primary evacuation expense
export const createPrimaryEvacuationExpense = async (req, res, next) => {
  const { vehicle, category, amount, currency, dateOfExpense, recordedBy, notes } = req.body;

  try {
    const newExpense = new PrimaryEvacuationExpense({
      vehicle,
      category,
      amount,
      currency,
      dateOfExpense,
      recordedBy,
      notes,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json({ success: true, data: savedExpense });
  } catch (error) {
    console.error('Error creating primary evacuation expense:', error);
    next(error);
  }
};

// Get all primary evacuation expenses
export const getAllPrimaryEvacuationExpenses = async (req, res, next) => {
  try {
    const expenses = await PrimaryEvacuationExpense.find();
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    console.error('Error fetching primary evacuation expenses:', error);
    next(error);
  }
};

// Get a specific primary evacuation expense by ID
export const getPrimaryEvacuationExpenseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const expense = await PrimaryEvacuationExpense.findById(id);
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    console.error('Error fetching primary evacuation expense:', error);
    next(error);
  }
};

// Update an existing primary evacuation expense by ID
export const updatePrimaryEvacuationExpense = async (req, res, next) => {
  const { id } = req.params;
  const { vehicle, category, amount, currency, dateOfExpense, recordedBy, notes } = req.body;

  try {
    const updatedExpense = await PrimaryEvacuationExpense.findByIdAndUpdate(
      id,
      { vehicle, category, amount, currency, dateOfExpense, recordedBy, notes },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
    console.error('Error updating primary evacuation expense:', error);
    next(error);
  }
};

// Delete a primary evacuation expense by ID
export const deletePrimaryEvacuationExpense = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedExpense = await PrimaryEvacuationExpense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({ success: true, message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting primary evacuation expense:', error);
    next(error);
  }
};


// Create a new other trip expense
export const createOtherTripExpense = async (req, res, next) => {
  const { vehicle, driver, category, amount, currency, dateOfExpense, recordedBy, notes } = req.body;

  try {
    const newExpense = new OtherTripExpense({
      vehicle,
      driver,
      category,
      amount,
      currency,
      dateOfExpense,
      recordedBy,
      notes,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json({ success: true, data: savedExpense });
  } catch (error) {
    console.error('Error creating other trip expense:', error);
    next(error);
  }
};


// Get all other trip expenses
export const getAllOtherTripExpenses = async (req, res, next) => {
  try {
    const expenses = await OtherTripExpense.find()
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName');
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    console.error('Error fetching other trip expenses:', error);
    next(error);
  }
};

// Get a specific other trip expense by ID
export const getOtherTripExpenseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const expense = await OtherTripExpense.findById(id)
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName');
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    console.error('Error fetching other trip expense:', error);
    next(error);
  }
};


// Update an existing other trip expense by ID
export const updateOtherTripExpense = async (req, res, next) => {
  const { id } = req.params;
  const { vehicle,  category, amount, currency, dateOfExpense, recordedBy, notes } = req.body;

  try {
    const updatedExpense = await OtherTripExpense.findByIdAndUpdate(
      id,
      { vehicle,  category, amount, currency, dateOfExpense, recordedBy, notes },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
    console.error('Error updating other trip expense:', error);
    next(error);
  }
};

// Delete an other trip expense by ID
export const deleteOtherTripExpense = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedExpense = await OtherTripExpense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({ success: true, message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting other trip expense:', error);
    next(error);
  }
};




// Create a new general expense
export const createGeneralExpense = async (req, res, next) => {
  const { vehicle, category, amount, currency, dateOfExpense, recordedBy, notes } = req.body;

  try {
    const newExpense = new GeneralExpense({
      vehicle,
      category,
      amount,
      currency,
      dateOfExpense,
      recordedBy,
      notes,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json({ success: true, data: savedExpense });
  } catch (error) {
    console.error('Error creating general expense:', error);
    next(error);
  }
};

// Get all general expenses
export const getAllGeneralExpenses = async (req, res, next) => {
  try {
    const expenses = await GeneralExpense.find().populate('vehicle', 'registrationNumber');
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    console.error('Error fetching general expenses:', error);
    next(error);
  }
};

// Get a specific general expense by ID
export const getGeneralExpenseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const expense = await GeneralExpense.findById(id).populate('vehicle', 'registrationNumber');
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    console.error('Error fetching general expense:', error);
    next(error);
  }
};

// Update an existing general expense by ID
export const updateGeneralExpense = async (req, res, next) => {
  const { id } = req.params;
  const { vehicle, category, amount, currency, dateOfExpense, recordedBy, notes } = req.body;

  try {
    const updatedExpense = await GeneralExpense.findByIdAndUpdate(
      id,
      { vehicle, category, amount, currency, dateOfExpense, recordedBy, notes },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
    console.error('Error updating general expense:', error);
    next(error);
  }
};

// Delete a general expense by ID
export const deleteGeneralExpense = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedExpense = await GeneralExpense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({ success: true, message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting general expense:', error);
    next(error);
  }
};




export const getAllActivitiesAndTransactionsRecords = async (req, res, next) => {
  try {
    const primaryEvacuations = await PrimaryEvacuation.find()
      .populate('cocoaPricePerBag', 'pricePerBagAfterTax') // Assuming this is a field in CocoaPricePerBag model
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName');
    
    const otherTrips = await OtherTrip.find()
      .populate('vehicle', 'registrationNumber')
      .populate('driver', 'firstName lastName');
    
    const primaryEvacuationExpenses = await PrimaryEvacuationExpense.find()
      .populate('vehicle', 'registrationNumber');
    
    const otherTripExpenses = await OtherTripExpense.find()
      .populate('vehicle', 'registrationNumber');
    
    const generalExpenses = await GeneralExpense.find()
      .populate('vehicle', 'registrationNumber');
    
    const incomes = await Income.find(); // Fetch all income records

    // Combine all records in a response object
    res.status(200).json({
      success: true,
      data: {
        primaryEvacuations,
        otherTrips,
        primaryEvacuationExpenses,
        otherTripExpenses,
        generalExpenses,
        incomes, // Include the income records in the response
      },
    });
  } catch (error) {
    console.error('Error fetching all records:', error);
    next(error);
  }
};



export const getAllFinancialRecordsGroupedByVehicle = async (req, res, next) => {
  try {
    // Fetch all vehicles
    const vehicles = await Vehicle.find();

    // Prepare an object to store the grouped records
    const groupedRecords = {};

    // Iterate over each vehicle and gather the financial records associated with it
    for (let vehicle of vehicles) {
      const vehicleId = vehicle._id;
      const registrationNumber = vehicle.registrationNumber;

      // Fetch records associated with this vehicle
      const primaryEvacuationExpenses = await PrimaryEvacuationExpense.find({ vehicle: vehicleId });
      const generalExpenses = await GeneralExpense.find({ vehicle: vehicleId });
      const otherTripExpenses = await OtherTripExpense.find({ vehicle: vehicleId });
      const incomes = await Income.find({ vehicle: vehicleId }); // Fetch incomes related to the vehicle

      // Create an object for this vehicle containing all its related records
      groupedRecords[registrationNumber] = {
        vehicleInfo: {
          registrationNumber: vehicle.registrationNumber,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          color: vehicle.color,
          owner: vehicle.owner,
        },
        primaryEvacuationExpenses,
        generalExpenses,
        otherTripExpenses,
        incomes,
      };
    }

    // Respond with the grouped records
    res.status(200).json({
      success: true,
      data: groupedRecords,
    });
  } catch (error) {
    console.error('Error fetching all financial records grouped by vehicle:', error);
    next(error);
  }
};


export const getFinancialRecordsByVehicleWithinPeriod = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate that both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Please provide both startDate and endDate.' });
    }

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure end date includes the entire day
    end.setHours(23, 59, 59, 999);

    // Fetch all vehicles
    const vehicles = await Vehicle.find();

    // Prepare an object to store the grouped records
    const groupedRecords = {};

    // Iterate over each vehicle and gather the financial records within the specified period
    for (let vehicle of vehicles) {
      const vehicleId = vehicle._id;
      const registrationNumber = vehicle.registrationNumber;

      // Fetch records associated with this vehicle within the date range
      const primaryEvacuationExpenses = await PrimaryEvacuationExpense.find({
        vehicle: vehicleId,
        dateOfExpense: { $gte: start, $lte: end },
      });

      const generalExpenses = await GeneralExpense.find({
        vehicle: vehicleId,
        dateOfExpense: { $gte: start, $lte: end },
      });

      const otherTripExpenses = await OtherTripExpense.find({
        vehicle: vehicleId,
        dateOfExpense: { $gte: start, $lte: end },
      });

      const incomes = await Income.find({
        vehicle: vehicleId,
        date: { $gte: start, $lte: end },
      });

      // Create an object for this vehicle containing all its related records within the period
      groupedRecords[registrationNumber] = {
        vehicleInfo: {
          registrationNumber: vehicle.registrationNumber,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          color: vehicle.color,
          owner: vehicle.owner,
        },
        primaryEvacuationExpenses,
        generalExpenses,
        otherTripExpenses,
        incomes,
      };
    }

    // Respond with the grouped records within the specified period
    res.status(200).json({
      success: true,
      data: groupedRecords,
    });
  } catch (error) {
    console.error('Error fetching financial records by vehicle within period:', error);
    next(error);
  }
};



// Create a new transfer
export const createTransfer = async (req, res) => {
  try {
    const { vehicle, recipient, amount, paymentMethod, momoNumber, notes, recordedBy } = req.body;

    // Check if the referenced vehicle exists
    const existingVehicle = await Vehicle.findById(vehicle);
    if (!existingVehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    // Check if the referenced recipient (Partner) exists
    const existingRecipient = await Partner.findById(recipient);
    if (!existingRecipient) {
      return res.status(404).json({ success: false, message: 'Recipient (Partner) not found' });
    }

    // Create the new transfer
    const newTransfer = new Transfer({
      vehicle,
      recipient,
      amount,
      paymentMethod,
      momoNumber,
      notes,
      recordedBy,
    });

    await newTransfer.save();

    // Create a new expense with category "Transfer"
    const newExpense = new GeneralExpense({
      vehicle,
      category: 'Transfer',
      amount,
      currency: 'Ghc', // Assuming the default currency is 'Ghc'
      dateOfExpense: new Date(),
      recordedBy,
      notes: notes || `Transfer to ${existingRecipient.name}`,
    });

    await newExpense.save();

    res.status(201).json({ success: true, data: newTransfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all transfers
export const getAllTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().populate('vehicle'); // Populating vehicle details
    res.status(200).json({ success: true, data: transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a transfer by ID
export const getTransferById = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id).populate('vehicle');
    if (!transfer) {
      return res.status(404).json({ success: false, message: 'Transfer not found' });
    }
    res.status(200).json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a transfer by ID
export const updateTransfer = async (req, res) => {
  try {
    const { vehicle, amount, paymentMethod, momoNumber, notes, recordedBy } = req.body;

    const updatedTransfer = await Transfer.findByIdAndUpdate(
      req.params.id,
      { vehicle, amount, paymentMethod, momoNumber, notes, recordedBy },
      { new: true, runValidators: true }
    ).populate('vehicle');

    if (!updatedTransfer) {
      return res.status(404).json({ success: false, message: 'Transfer not found' });
    }

    res.status(200).json({ success: true, data: updatedTransfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a transfer by ID
export const deleteTransfer = async (req, res) => {
  try {
    const deletedTransfer = await Transfer.findByIdAndDelete(req.params.id);

    if (!deletedTransfer) {
      return res.status(404).json({ success: false, message: 'Transfer not found' });
    }

    res.status(200).json({ success: true, message: 'Transfer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const createInsurance = async (req, res) => {
  const session = await insuranceModel.startSession();
  session.startTransaction(); // Start a transaction to ensure atomic operations
  try {
    const {
      vehicle,
      insuranceCompany,
      policyNumber,
      startDate,
      endDate,
      premiumAmount,
      coverageDetails,
      recordedBy,
    } = req.body;

    // Create the insurance record
    const newInsurance = new insuranceModel({
      vehicle,
      insuranceCompany,
      policyNumber,
      startDate,
      endDate,
      premiumAmount,
      coverageDetails,
      recordedBy,
    });

    // Save the insurance record
    await newInsurance.save({ session });

    // Create the corresponding expense record
    const newExpense = new GeneralExpense({
      vehicle,
      category: 'Insurance', // Set the default category to 'Insurance'
      amount: premiumAmount, // Using the insurance premium amount as the expense
      currency: 'Ghc', // Default currency
      dateOfExpense: new Date(), // Expense date as the current date
      recordedBy, // Recorded by the same person who recorded the insurance
      notes: `Insurance premium for policy ${policyNumber}`, // Notes for clarity
    });

    // Save the expense record
    await newExpense.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: 'Insurance record and corresponding expense created successfully!',
      insurance: newInsurance,
      expense: newExpense,
    });
  } catch (error) {
    // If something goes wrong, abort the transaction
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: 'Error creating insurance record and expense',
      error: error.message,
    });
  }
};



// Get all insurance records
export const getAllInsurance = async (req, res) => {
  try {
    const insurances = await insuranceModel.find().populate('vehicle'); // Populating the vehicle reference
    return res.status(200).json(insurances);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching insurance records', error: error.message });
  }
};


// Get an insurance record by ID
export const getInsuranceById = async (req, res) => {
  try {
    const { id } = req.params;
    const insurance = await insuranceModel.findById(id).populate('vehicle'); // Populating the vehicle reference

    if (!insurance) {
      return res.status(404).json({ message: 'Insurance record not found' });
    }

    return res.status(200).json(insurance);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching insurance record', error: error.message });
  }
};


// Update an insurance record by ID
export const updateInsurance = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedInsurance = await insuranceModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedInsurance) {
      return res.status(404).json({ message: 'Insurance record not found' });
    }

    return res.status(200).json({ message: 'Insurance record updated successfully!', insurance: updatedInsurance });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating insurance record', error: error.message });
  }
};

// Delete an insurance record by ID
export const deleteInsurance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInsurance = await insuranceModel.findByIdAndDelete(id);

    if (!deletedInsurance) {
      return res.status(404).json({ message: 'Insurance record not found' });
    }

    return res.status(200).json({ message: 'Insurance record deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting insurance record', error: error.message });
  }
};


// Backend - Fetch the most recent active insurance for a vehicle
export const getMostRecentActiveInsurance = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    // Find the most recent and active insurance record for the vehicle
    const insurance = await insuranceModel
      .findOne({ vehicle: vehicleId, isActive: true })
      .sort({ endDate: -1 }); // Sort by endDate in descending order

    if (!insurance) {
      return res.status(404).json({ message: 'No active insurance found for this vehicle' });
    }

    return res.status(200).json(insurance);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching insurance record', error: error.message });
  }
};




// Create a new Roadworthy record and save an expense
export const createRoadworthy = async (req, res) => {
  try {
    const {
      vehicle,
      certificateNumber,
      issueDate,
      expiryDate,
      renewalAmount,
      details,
      roadworthyCenter,  // Added roadworthyCenter field
      recordedBy
    } = req.body;

    // Step 1: Create the new roadworthy record
    const newRoadworthy = new roadworthyModel({
      vehicle,
      certificateNumber,
      issueDate,
      expiryDate,
      renewalAmount,
      details,
      roadworthyCenter,  // Save the roadworthyCenter field
      recordedBy
    });

    await newRoadworthy.save();

    // Step 2: Save the associated expense for the roadworthy certificate
    const newExpense = new GeneralExpense({
      vehicle,
      category: 'Roadworthy', // Default category
      amount: renewalAmount,
      recordedBy,
      notes: `Roadworthy renewal for certificate number ${certificateNumber}`,
    });

    await newExpense.save();

    return res.status(201).json({
      message: 'Roadworthy record and expense created successfully!',
      roadworthy: newRoadworthy,
      expense: newExpense
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating roadworthy record', error: error.message });
  }
};



export const getAllRoadworthy = async (req, res) => {
  try {
    const roadworthyRecords = await roadworthyModel.find().populate('vehicle'); // Populate the vehicle reference
    return res.status(200).json(roadworthyRecords);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching roadworthy records', error: error.message });
  }
};


export const getRoadworthyById = async (req, res) => {
  try {
    const { id } = req.params;
    const roadworthy = await roadworthyModel.findById(id).populate('vehicle');

    if (!roadworthy) {
      return res.status(404).json({ message: 'Roadworthy record not found' });
    }

    return res.status(200).json(roadworthy);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching roadworthy record', error: error.message });
  }
};


export const updateRoadworthy = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoadworthy = await roadworthyModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedRoadworthy) {
      return res.status(404).json({ message: 'Roadworthy record not found' });
    }

    return res.status(200).json({
      message: 'Roadworthy record updated successfully',
      roadworthy: updatedRoadworthy
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating roadworthy record', error: error.message });
  }
};


export const deleteRoadworthy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoadworthy = await roadworthyModel.findByIdAndDelete(id);

    if (!deletedRoadworthy) {
      return res.status(404).json({ message: 'Roadworthy record not found' });
    }

    return res.status(200).json({
      message: 'Roadworthy record deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting roadworthy record', error: error.message });
  }
};


export const getMostRecentActiveRoadworthy = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const roadworthy = await roadworthyModel
      .findOne({ vehicle: vehicleId, isActive: true })
      .sort({ expiryDate: -1 });

    if (!roadworthy) {
      return res.status(404).json({ message: 'No active roadworthy certificate found for this vehicle' });
    }

    return res.status(200).json(roadworthy);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching roadworthy record', error: error.message });
  }
};
