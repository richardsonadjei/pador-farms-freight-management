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



// Get a single payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


