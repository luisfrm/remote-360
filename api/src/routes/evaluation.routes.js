const express = require('express');
const EvaluationController = require('../controllers/evaluation.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateSchema } = require('../middlewares/validator.middleware');
const evaluationSchema = require('../schemas/evaluation.schema');

const router = express.Router();

router.post('/360/initiate', authMiddleware(['Admin', 'Manager']), validateSchema(evaluationSchema), EvaluationController.initiate360Evaluation);
router.get('/360/:masterEvaluationId/status', authMiddleware(['Admin', 'Manager']), EvaluationController.get360EvaluationStatus);
router.put('/360/:evaluationId/submit', authMiddleware(['Employee', 'Manager', 'Admin']), validateSchema(evaluationSchema), EvaluationController.submit360Evaluation);
router.get('/360/:masterEvaluationId/report', authMiddleware(['Admin', 'Manager']), EvaluationController.generate360Report);
router.get('/pending', authMiddleware(['Employee', 'Manager', 'Admin']), EvaluationController.getUserPendingEvaluations);
router.get('/360/:masterEvaluationId/pending-members', authMiddleware(['Admin', 'Manager']), EvaluationController.getPendingMembersForMasterEvaluation);

router.put('/:evaluationId', authMiddleware(['Admin', 'Manager']), validateSchema(evaluationSchema), EvaluationController.updateEvaluation);
router.delete('/:evaluationId', authMiddleware(['Admin']), EvaluationController.deleteEvaluation);

module.exports = router;