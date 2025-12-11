const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
  // 1. Yahan hum poora data nahi, sirf Student ki ID rakhenge
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students', // Ye batata hai ke ye ID "Student" collection se match karni hai
    required: true
  },
  
  // 2. Hazri ki tareekh
  date: {
    type: Date,
    required: true
  },

  // 3. Status (Aaya hai ya nahi)
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave'],
    default: 'Present'
  }

  // 4. Kis Qari ne hazri lagayi (Optional but good for record)
});

// Ek bacha ek din main do baar hazri na laga sake, uske liye ye line zaroori hai:
studentAttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

const StudentAttendance = mongoose.model('StudentAttendance', studentAttendanceSchema);
module.exports = StudentAttendance;