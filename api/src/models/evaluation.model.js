const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationSchema = new mongoose.Schema({
	employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
	evaluator: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
	period: { type: String, required: true }, // e.g., "Q2 2024"
	status: {
		type: String,
		enum: ["Pending", "In Progress", "Completed"],
		default: "Pending",
	},
	categories: [
		{
			name: { type: String, required: true },
			score: { type: Number, min: 1, max: 5 },
			comments: String,
		},
	],
	overallScore: { type: Number, min: 1, max: 5 },
	comments: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Evaluation", evaluationSchema);
