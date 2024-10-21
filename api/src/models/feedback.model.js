const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
	evaluation: {
		type: Schema.Types.ObjectId,
		ref: "Evaluation",
		required: true,
	},
	sender: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
	recipient: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
	content: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
