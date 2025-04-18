// backend/middlewares/verifyToken.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;  // Get the authorization header

  // Check if the authorization header is missing or malformed
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });  // Return error if no token is provided
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token with the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user info to req.user if token is valid
    req.user = {
      _id: decoded._id,  // Attach user ID
      email: decoded.email,  // Attach user email
      name: decoded.name,  // Attach user name if available
    };

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });  // Return error if token is invalid or expired
  }
};