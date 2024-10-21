const { z } = require('zod');

const subscriptionSchema = z.object({
  endpoint: z.string().url(),
  expirationTime: z.number().nullable(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string()
  })
});

const notificationPreferenceSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'never'])
});

const notificationSchemas = {
  subscribe: z.object({
    subscription: subscriptionSchema
  }),
  updatePreferences: notificationPreferenceSchema
};

module.exports = notificationSchemas;