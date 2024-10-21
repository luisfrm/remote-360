const { webpush, vapidKeys } = require('../utils/webpush');
const Subscription = require('../models/subscription.model');
const Evaluation = require('../models/evaluation.model');
const User = require('../models/user.model');

class NotificationController {
  static async subscribe(req, res) {
    try {
      const { subscription } = req.body;
      const userId = req.user.userId;

      let userSubscription = await Subscription.findOne({ userId });

      if (userSubscription) {
        userSubscription.subscription = subscription;
        await userSubscription.save();
      } else {
        userSubscription = new Subscription({ userId, subscription });
        await userSubscription.save();
      }

      res.status(201).json({ message: 'Subscription saved', publicKey: vapidKeys.publicKey });
    } catch (error) {
      console.error('Error saving subscription:', error);
      res.status(500).json({ message: 'Error saving subscription' });
    }
  }

  static async sendNotification(userId, payload) {
    try {
      const subscription = await Subscription.findOne({ userId });
      if (subscription) {
        await webpush.sendNotification(subscription.subscription, JSON.stringify(payload));
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  static async sendPendingEvaluationNotifications(frequency) {
    try {
      const users = await User.find({ notificationPreference: frequency });
      
      for (const user of users) {
        const pendingCount = await Evaluation.countDocuments({ evaluator: user._id, status: { $ne: 'Completed' } });
        
        if (pendingCount > 0) {
          const payload = {
            title: 'Evaluaciones Pendientes',
            body: `Tienes ${pendingCount} evaluaciones pendientes por completar.`
          };
          await NotificationController.sendNotification(user._id, payload);
        }
      }

      console.log(`Pending evaluation notifications sent successfully for ${frequency} preference`);
    } catch (error) {
      console.error(`Error sending pending evaluation notifications for ${frequency} preference:`, error);
    }
  }
}

module.exports = NotificationController;