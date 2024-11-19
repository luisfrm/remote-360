const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	description: { type: String, required: false, trim: true },
	managerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: null },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Department', departmentSchema);