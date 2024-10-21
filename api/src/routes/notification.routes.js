const express = require('express');
const NotificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateSchema } = require('../middlewares/validator.middleware');
const notificationSchemas = require('../schemas/notification.schema');

const router = express.Router();

router.post('/subscribe', 
  authMiddleware(['Employee', 'Manager', 'Admin']), 
  validateSchema(notificationSchemas.subscribe),
  NotificationController.subscribe
);

module.exports = router;