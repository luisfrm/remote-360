const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  hireDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);