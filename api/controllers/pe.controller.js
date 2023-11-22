import CocoaHaulage from '../models/pe.model.js';
import IncomeHauling from '../models/income.model.js';
import DriverCommission from '../models/driversCommission.model.js'; // Import the DriverCommission model

const createCocoaHaulage = async (req, res) => {
  try {
    const {
      date,
      truckRegistrationNumber,
      driverName,
      quantity,
      totalweightCarried,
      destinationLocations,
      recordedBy,
      incomeAmountPerBag,
      category,
      description,
    } = req.body;

    // Calculate totalIncomeAmount and totalTaxAmount
    const totalIncomeAmount = incomeAmountPerBag * quantity;
    const taxAmountPerBag = incomeAmountPerBag * 0.1;
    const totalTaxAmount = taxAmountPerBag * quantity;

    // Calculate netTotalAmountPerbag and netTotalAmount
    const netTotalAmountPerbag = incomeAmountPerBag - taxAmountPerBag;
    const netTotalAmount = netTotalAmountPerbag * quantity;

    // Create new CocoaHaulage instance
    const cocoaHaulage = new CocoaHaulage({
      date,
      truckRegistrationNumber,
      driverName,
      quantity,
      totalweightCarried,
      destinationLocations,
      recordedBy,
    });

    // Save new CocoaHaulage instance
    await cocoaHaulage.save();

    // Create new IncomeHauling instance with default description
    const defaultDescription = `Income from hauling ${quantity} bags of cocoa.`;
    const incomeHauling = new IncomeHauling({
      date,
      category,
      truckRegistrationNumber,
      incomeAmountPerBag,
      totalIncomeAmount,
      taxAmountPerBag,
      totalTaxAmount,
      netTotalAmountPerbag,
      netTotalAmount,
      description: description || defaultDescription, // Use provided description or default
      recordedBy,
    });

    // Save new IncomeHauling instance
    await incomeHauling.save();

    // Create new DriverCommission instance
    const commissionAmountPerBag = 1; // Set commissionAmountPerBag to 1
    const totalCommissionAmount = commissionAmountPerBag * quantity;

    const driverCommission = new DriverCommission({
      date,
      driverName,
      commissionAmountPerBag,
      totalCommissionAmount,
      description: `Commission from hauling ${quantity} bags of cocoa.`,
      recordedBy,
      peNumber: cocoaHaulage.peNumber, // Use peNumber from CocoaHaulage
    });

    // Save new DriverCommission instance
    await driverCommission.save();

    res.status(201).json({ cocoaHaulage, incomeHauling, driverCommission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createCocoaHaulage };
