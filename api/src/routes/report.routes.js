const express = require('express');
const ReportController = require('../controllers/report.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/employee/:employeeId', authMiddleware(['Admin', 'Manager']), ReportController.generateEmployeeReport);

module.exports = router;