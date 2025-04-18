// backend/controllers/authController.js

import User from '../Models/User.js';
import { generateToken } from '../utils/jwt.js';

// ==========================
// ✅ Register User Controller
// ==========================
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate token with full user payload
    const token = generateToken({
      _id: user._id,
      email: user.email,
      name: user.name,
    });

    // Send response
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Register Error:", error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ========================
// ✅ Login User Controller
// ========================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token with full user payload
    const token = generateToken({
      _id: user._id,
      email: user.email,
      name: user.name,
    });

    // Send response
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};