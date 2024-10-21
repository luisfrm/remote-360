const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  `mailto:${process.env.WEBPUSH_EMAIL}`,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports = {
  webpush,
  vapidKeys
};