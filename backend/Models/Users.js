import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Optional: Adds createdAt, updatedAt

// Prevent model overwrite error in dev with ES Modules
const Users = mongoose.models.Users || mongoose.model('Users', UserSchema);

export default Users;