// paymentController.js
import Payment from '../models/partnerShares.model.js'; // Update the path

// Create a new payment
export const createPartnerPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get payments within a date range
export const getPartnerPayments = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Adjust the dates to UTC format
    const startDateUTC = new Date(parsedStartDate.toISOString());
    const endDateUTC = new Date(parsedEndDate.toISOString());

    

    const payments = await Payment.find({
      date: {
        $gte: startDateUTC,
        $lte: endDateUTC,
      },
    });
    

   

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentsByNameAndPeriod = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Log the parsed values for debugging
    console.log('Parsed Start Date:', parsedStartDate);
    console.log('Parsed End Date:', parsedEndDate);

    // Use the find method to search for payments with the specified conditions
    const cleanedName = name.trim(); // Remove leading and trailing whitespaces

    // Log the cleaned name for debugging
    console.log('Cleaned Name:', cleanedName);

    const payments = await Payment.find({
      name: { $regex: new RegExp(cleanedName, 'i') },
      createdAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Log the found payments for debugging
    console.log('Found Payments:', payments);

    if (payments.length === 0) {
      return res.status(404).json({ message: 'Payments not found for the given criteria' });
    }

    res.status(200).json(payments);
  } catch (error) {
    // Log the error for debugging
    console.error('Error in getPaymentsByNameAndPeriod:', error.message);
    res.status(500).json({ message: error.message });
  }
};



