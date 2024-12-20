const Feedback = require('../models/feedback.model');

class FeedbackController {
  static async createFeedback(req, res) {
    try {
      const { evaluationId, content } = req.body;
      const feedback = new Feedback({
        evaluation: evaluationId,
        content,
        author: req.user.userId
      });
      await feedback.save();
      res.status(201).json({ message: 'Feedback created successfully', feedback });
    } catch (error) {
      console.error('Error creating feedback:', error);
      res.status(500).json({ message: 'Error creating feedback' });
    }
  }

  static async getFeedbackForEvaluation(req, res) {
    try {
      const { evaluationId } = req.params;
      const feedback = await Feedback.find({ evaluation: evaluationId })
        .populate('author', 'firstName lastName');
      res.json(feedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      res.status(500).json({ message: 'Error fetching feedback' });
    }
  }

  static async updateFeedback(req, res) {
    try {
      const { feedbackId } = req.params;
      const { content } = req.body;
      
      const feedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { content },
        { new: true }
      );
      
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      
      res.status(200).json({ message: 'Feedback updated successfully', feedback });
    } catch (error) {
      console.error('Error updating feedback:', error);
      res.status(500).json({ message: 'Error updating feedback' });
    }
  }

  static async deleteFeedback(req, res) {
    try {
      const { feedbackId } = req.params;
      
      const feedback = await Feedback.findByIdAndDelete(feedbackId);
      
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      
      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({ message: 'Error deleting feedback' });
    }
  }
}

module.exports = FeedbackController;