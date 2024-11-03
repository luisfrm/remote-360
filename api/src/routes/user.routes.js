const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateSchema, validatePartialSchema } = require('../middlewares/validator.middleware');
const { 
  registerSchema, 
  loginSchema, 
  updatePasswordSchema,
  registerUserAndEmployeeSchema
} = require('../schemas/user.schema');

const router = express.Router();

router.post('/register', authMiddleware(['Admin']), validateSchema(registerSchema), UserController.register);
router.post('/login', validateSchema(loginSchema), UserController.login);
router.post('/create-user-and-employee', authMiddleware(['Admin']), validateSchema(registerUserAndEmployeeSchema), UserController.createUserAndEmployee);

router.post('/validate-token', UserController.validateToken);

router.get('/profile', authMiddleware(), UserController.getProfile);
router.put('/profile', authMiddleware(), validatePartialSchema(registerSchema), UserController.updateProfile);
router.put('/password', authMiddleware(), validateSchema(updatePasswordSchema), UserController.updatePassword);

module.exports = router;