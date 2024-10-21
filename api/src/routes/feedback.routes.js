const express = require('express');
const FeedbackController = require('../controllers/feedback.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateSchema } = require('../middlewares/validator.middleware');
const feedbackSchema = require('../schemas/feedback.schema');

const router = express.Router();

router.post('/', authMiddleware(['Employee', 'Manager', 'Admin']), validateSchema(feedbackSchema), FeedbackController.createFeedback);
router.get('/evaluation/:evaluationId', authMiddleware(['Employee', 'Manager', 'Admin']), FeedbackController.getFeedbackForEvaluation);

router.put('/:feedbackId', authMiddleware(['Employee', 'Manager', 'Admin']), validateSchema(feedbackSchema), FeedbackController.updateFeedback);
router.delete('/:feedbackId', authMiddleware(['Admin', 'Manager']), FeedbackController.deleteFeedback);

module.exports = router;