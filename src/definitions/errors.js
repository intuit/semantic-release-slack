module.exports = {
  EMISSINGSLACKWEBHOOKURL: () => ({
    message: 'Missing Slack Webhook Url',
    details: `A slack webhook URL is required to post updates to a channel. Ensure you have the environment variable SLACK_WEBHOOK_URL set appropriately and try again`,
  }),
};
