import bcryptjs from 'bcryptjs';

import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

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


export const signin = async (req, res, next) => {
  const { userNameOrEmail, password } = req.body;
  try {
    // Find user by userName or email
    const validUser = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });

    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Include userName and category in the token payload
    const tokenPayload = {
      id: validUser._id,
      userName: validUser.userName,
      email: validUser.email,
      role: validUser.role,
      category: validUser.category, // Include category in the token payload
    };

    // Sign the token with the updated payload
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie and include userName and category in the response
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({
        id: validUser._id,
        userName: validUser.userName,
        email: validUser.email,
        role: validUser.role,
        category: validUser.category, // Include category in the response
      });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  // Clear the token cookie to sign the user out
  res.clearCookie('access_token');

  // Return a success response
  return res.status(200).json({ success: true, message: 'User signed out successfully' });
};
