import express from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from '../Controllers/UsersController.js';

const router = express.Router();

// Base path is /api/users → these are relative to that

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getUsers);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;