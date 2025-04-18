// backend/utils/jwt.js

import jwt from 'jsonwebtoken';

// Function to generate JWT token for the user
export const generateToken = (user) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';  // Default expiration is 1 hour if not set in environment

  // Generate and return JWT token
  return jwt.sign(
    {
      _id: user._id,    // Include _id
      email: user.email, // Include email
      name: user.name,   // Include name
    },
    process.env.JWT_SECRET,  // Secret key for signing the token
    { expiresIn }  // Set token expiration
  );
};
