const { z } = require("zod");

const registerSchema = z.object({
	username: z
		.string({
			required_error: "Username is required",
			invalid_type_error: "Username must be a string",
		})
		.min(3, { message: "Username must be at least 3 characters long" }),

	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email({
			message: "Invalid email format",
		}),

	password: z
		.string({
			required_error: "Password is required",
			invalid_type_error: "Password must be a string",
		})
		.min(8, { message: "Password must be at least 8 characters long" }),

	role: z.enum(["Admin", "Manager", "Employee"], {
		required_error: "Role is required",
		invalid_type_error: "Invalid role",
	}),
});

const registerUserAndEmployeeSchema = z.object({
	username: z
		.string({
			required_error: "Username is required",
			invalid_type_error: "Username must be a string",
		})
		.min(3, { message: "Username must be at least 3 characters long" }),

	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email({
			message: "Invalid email format",
		}),

	password: z
		.string({
			required_error: "Password is required",
			invalid_type_error: "Password must be a string",
		})
		.min(8, { message: "Password must be at least 8 characters long" }),

	role: z.enum(["Admin", "Manager", "Employee"], {
		required_error: "Role is required",
		invalid_type_error: "Invalid role",
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

const loginSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email({
			message: "Invalid email format",
		}),

	password: z.string({
		required_error: "Password is required",
		invalid_type_error: "Password must be a string",
	}),
});

const updatePasswordSchema = z.object({
	currentPassword: z.string().min(6),
	newPassword: z
		.string()
		.min(6)
		.refine(
			(val) => {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(val);
			},
			{
				message:
					"Password must contain at least one uppercase letter, one lowercase letter, and one number",
			}
		),
});

module.exports = {
	registerSchema,
	registerUserAndEmployeeSchema,
	loginSchema,
	updatePasswordSchema,
};
