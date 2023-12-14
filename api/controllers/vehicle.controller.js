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



// Controller to get a single vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }

    res.status(200).json({ vehicle });
  } catch (error) {
    console.error('Error getting vehicle by ID:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to update a vehicle by ID
export const updateVehicleById = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }

    res.status(200).json({ message: 'Vehicle updated successfully.', vehicle: updatedVehicle });
  } catch (error) {
    console.error('Error updating vehicle by ID:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// Controller to delete a vehicle by ID
export const deleteVehicleById = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!deletedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully.' });
  } catch (error) {
    console.error('Error deleting vehicle by ID:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};
