const { z } = require("zod");

const employeeSchema = z.object({
	user: z.string({
		required_error: "User ID is required",
		invalid_type_error: "User ID must be a string",
	}),

	firstName: z.string({
		required_error: "First name is required",
		invalid_type_error: "First name must be a string",
	}),

	lastName: z.string({
		required_error: "Last name is required",
		invalid_type_error: "Last name must be a string",
	}),

	position: z.string({
		required_error: "Position is required",
		invalid_type_error: "Position must be a string",
	}),

	department: z.string({
		required_error: "Department is required",
		invalid_type_error: "Department must be a string",
	}),

	hireDate: z.date({
		required_error: "Hire date is required",
		invalid_type_error: "Hire date must be a valid date",
	}),

	manager: z
		.string({
			invalid_type_error: "Manager ID must be a string",
		})
		.optional(),
});

module.exports = employeeSchema;
