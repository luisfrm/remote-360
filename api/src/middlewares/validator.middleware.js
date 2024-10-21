const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

const validatePartialSchema = (schema) => async (req, res, next) => {
  try {
    await schema.partial().parseAsync(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

module.exports = {
  validateSchema,
  validatePartialSchema
};