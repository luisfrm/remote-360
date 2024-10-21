const cron = require('node-cron');
const NotificationController = require('../controllers/notification.controller');

function initializeScheduledTasks() {
  // Ejecutar diariamente a las 9:00 AM
  cron.schedule('0 9 * * *', () => {
    NotificationController.sendPendingEvaluationNotifications('daily');
  });

  // Ejecutar semanalmente los lunes a las 9:00 AM
  cron.schedule('0 9 * * 1', () => {
    NotificationController.sendPendingEvaluationNotifications('weekly');
  });

  console.log('Scheduled tasks initialized');
}

module.exports = { initializeScheduledTasks };