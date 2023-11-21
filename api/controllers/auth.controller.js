import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

// Function to handle user registration
export const registerUser = async (req, res, next) => {
  try {
    // Destructure user details from the request body
    const {
      name,
      userName,
      email,
      password,
      telephoneNumber,
      ghanaCardNumber,
      bank,
      bankAccountNumber,
      bankBranch,
      nextOfKinName,
      nextOfKinContact,
      nextOfKinGhanaCardNumber,
      witnessName,
      witnessContact,
      role,
      category
    } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with hashed password
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
      telephoneNumber,
      ghanaCardNumber,
      bank,
      bankAccountNumber,
      bankBranch,
      nextOfKinName,
      nextOfKinContact,
      nextOfKinGhanaCardNumber,
      witnessName,
      witnessContact,
      role,
      category
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return a success response
    return res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    next(error);
  }
};
