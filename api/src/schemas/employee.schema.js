const { z } = require("zod");

const DepartmentEnum = z.enum(
	[
		"IT",
		"HR",
		"Finance",
		"Marketing",
		"Sales",
		"Operations",
		"Customer Service",
		"Research and Development",
		"Legal",
		"Executive",
	],
	{
		required_error: "Department is required",
		invalid_type_error: "Invalid department",
	}
);

const PositionEnum = z.enum(
	[
		"Intern",
		"Entry Level",
		"Associate",
		"Senior Associate",
		"Manager",
		"Senior Manager",
		"Director",
		"Vice President",
		"Senior Vice President",
		"C-Level Executive",
		"Chief Executive Officer",
	],
	{
		required_error: "Position is required",
		invalid_type_error: "Invalid position",
	}
);

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

	position: PositionEnum,

	department: DepartmentEnum,

	hireDate: z.string({
		required_error: "Hire date is required",
		invalid_type_error: "Hire date must be a valid date",
	}),

	isManager: z.boolean().default(false),
	manager: z.string().nullable().optional(),
});

module.exports = employeeSchema;
