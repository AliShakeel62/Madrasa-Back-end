const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Login ke liye
  password: { type: String, required: true }, // Hashed password
  role: { 
    type: String, 
    enum: ['admin', 'qari'], 
    default: 'qari' 
  },
  // Agar Admin (Qari Hamza) hain to ye true hoga, naye Qari ke liye false hoga
  isApproved: { 
    type: Boolean, 
    default: false 
  }, 
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;