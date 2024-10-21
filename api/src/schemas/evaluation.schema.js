const { z } = require("zod");

const categorySchema = z.object({
	name: z.string({
		required_error: "Category name is required",
		invalid_type_error: "Category name must be a string",
	}),
	score: z
		.number({
			required_error: "Score is required",
			invalid_type_error: "Score must be a number",
		})
		.min(1, { message: "Score must be at least 1" })
		.max(5, { message: "Score must be at most 5" }),
	comments: z
		.string({
			invalid_type_error: "Comments must be a string",
		})
		.optional(),
});

const evaluationSchema = z.object({
	employee: z.string({
		required_error: "Employee ID is required",
		invalid_type_error: "Employee ID must be a string",
	}),

	evaluator: z.string({
		required_error: "Evaluator ID is required",
		invalid_type_error: "Evaluator ID must be a string",
	}),

	period: z.string({
		required_error: "Evaluation period is required",
		invalid_type_error: "Evaluation period must be a string",
	}),

	status: z.enum(["Pending", "In Progress", "Completed"], {
		required_error: "Status is required",
		invalid_type_error: "Invalid status",
	}),

	categories: z
		.array(categorySchema, {
			required_error: "At least one category is required",
			invalid_type_error: "Categories must be an array",
		})
		.min(1, { message: "At least one category is required" }),

	overallScore: z
		.number({
			required_error: "Overall score is required",
			invalid_type_error: "Overall score must be a number",
		})
		.min(1, { message: "Overall score must be at least 1" })
		.max(5, { message: "Overall score must be at most 5" }),

	comments: z
		.string({
			invalid_type_error: "Comments must be a string",
		})
		.optional(),
});

module.exports = evaluationSchema;
