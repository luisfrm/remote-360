const express = require('express');
const EmployeeController = require('../controllers/employee.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateSchema } = require('../middlewares/validator.middleware');
const employeeSchema = require('../schemas/employee.schema');

const router = express.Router();

router.get('/', authMiddleware(['Admin', 'Manager']), EmployeeController.getAllEmployees);
router.get('/:id', authMiddleware(['Admin', 'Manager']), EmployeeController.getEmployeeById);
router.put('/:id', authMiddleware(['Admin']), validateSchema(employeeSchema), EmployeeController.updateEmployee);
router.delete('/:id', authMiddleware(['Admin']), EmployeeController.deleteEmployee);

module.exports = router;