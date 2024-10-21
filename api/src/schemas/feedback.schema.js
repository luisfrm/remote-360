const { z } = require("zod");

const feedbackSchema = z.object({
  evaluation: z.string({
    required_error: "Evaluation ID is required",
    invalid_type_error: "Evaluation ID must be a string",
  }),

  content: z
    .string({
      required_error: "Feedback content is required",
      invalid_type_error: "Feedback content must be a string",
    })
    .min(1, { message: "Feedback content cannot be empty" }),
});

module.exports = feedbackSchema;