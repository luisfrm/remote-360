const mongoose = require('mongoose');

const DepartmentEnum = {
  IT: 'IT',
  HR: 'HR',
  FINANCE: 'Finance',
  MARKETING: 'Marketing',
  SALES: 'Sales',
  OPERATIONS: 'Operations',
  CUSTOMER_SERVICE: 'Customer Service',
  RESEARCH_AND_DEVELOPMENT: 'Research and Development',
  LEGAL: 'Legal',
  EXECUTIVE: 'Executive'
};

const PositionEnum = {
  INTERN: 'Intern',
  ENTRY_LEVEL: 'Entry Level',
  ASSOCIATE: 'Associate',
  SENIOR_ASSOCIATE: 'Senior Associate',
  MANAGER: 'Manager',
  SENIOR_MANAGER: 'Senior Manager',
  DIRECTOR: 'Director',
  VICE_PRESIDENT: 'Vice President',
  SENIOR_VICE_PRESIDENT: 'Senior Vice President',
  C_LEVEL: 'C-Level Executive',
  CEO: 'Chief Executive Officer'
};

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true, enum: Object.values(DepartmentEnum) },
  position: { type: String, required: true, trim: true, enum: Object.values(PositionEnum) },
  isManager: { type: Boolean, default: false },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
  hireDate: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Índice único para asegurar solo un manager por departamento
employeeSchema.index({ department: 1, isManager: 1 }, { 
  unique: true, 
  partialFilterExpression: { isManager: true } 
});

module.exports = mongoose.model('Employee', employeeSchema);