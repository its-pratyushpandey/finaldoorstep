// backend/Routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../Controllers/AuthController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// POST /api/v1/auth/register
router.post('/register', registerUser);

// POST /api/v1/auth/login
router.post('/login', loginUser);

// ✅ NEW: GET /api/v1/auth/verify
router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({
    valid: true,
    user: req.user, // You get this from the decoded JWT in verifyToken
  });
});

export default router;