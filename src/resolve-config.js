/**
 * Used to extract certain important variables from the context and config that
 * semantic-release passes us
 */
module.exports = (pluginConfig, { env }) => ({
  slackWebhookUrl: env.SLACK_WEBHOOK_URL || null,
});
