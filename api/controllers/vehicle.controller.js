// controllers/vehicleController.js
import Vehicle from '../models/vehicle.model.js';

// Controller to create a new vehicle
export const createVehicle = async (req, res) => {
  try {
    const {
      registrationNumber,
      make,
      chasisNumber,
      model,
      year,
      capacity,
      yearPurchased,
      price,
      description,
      color,
      mileage,
      fuelType,
      status,
      registeredBy,
    } = req.body;

    // Check if the registrationNumber already exists
    const existingVehicle = await Vehicle.findOne({ registrationNumber });

    if (existingVehicle) {
      return res.status(400).json({ error: 'Vehicle with this registration number already exists.' });
    }

    // Create a new vehicle instance
    const newVehicle = new Vehicle({
      registrationNumber,
      make,
      chasisNumber,
      model,
      year,
      capacity,
      yearPurchased,
      price,
      description,
      color,
      mileage,
      fuelType,
      status,
      registeredBy,
    });

    // Save the new vehicle to the database
    await newVehicle.save();

    res.status(201).json({ message: 'Vehicle created successfully.', vehicle: newVehicle });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ vehicles });
  } catch (error) {
    console.error('Error getting vehicles:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to get a specific vehicle by registration number
export const getVehicleByRegistrationNumber = async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    const vehicle = await Vehicle.findOne({ registrationNumber });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    console.error('Error getting vehicle:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to update the status of a vehicle
export const updateVehicleStatus = async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    const { status } = req.body;

    // Find the vehicle by registration number
    const vehicle = await Vehicle.findOne({ registrationNumber });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }

    // Update the status
    vehicle.status = status;
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle status updated successfully.', vehicle });
  } catch (error) {
    console.error('Error updating vehicle status:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};
