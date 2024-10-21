const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	position: { type: String, required: true },
	department: { type: String, required: true },
	hireDate: { type: Date, required: true },
	manager: { type: Schema.Types.ObjectId, ref: "Employee" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);
