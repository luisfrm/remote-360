const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateSchema } = require('../middlewares/validator.middleware');
const { registerSchema, loginSchema } = require('../schemas/user.schema');

const router = express.Router();

router.post('/register', authMiddleware(['Admin']), validateSchema(registerSchema), UserController.register);
router.post('/login', validateSchema(loginSchema), UserController.login);
router.post('/logout', authMiddleware(), UserController.logout);
router.post('/create-user-and-employee', authMiddleware(['Admin']), validateSchema(registerSchema), UserController.createUserAndEmployee);

module.exports = router;