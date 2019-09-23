const AggregateError = require('aggregate-error');
const debug = require('debug')('@intuit/semantic-release-slack:verify');
const resolveConfig = require('./resolve-config');
const getError = require('./get-error');

/**
 * A method to verify that the user has given us a slack webhook url to post to
 */
module.exports = async (pluginConfig, context) => {
  const { logger } = context;
  const errors = [];
  const { slackWebhookUrl } = resolveConfig(pluginConfig, context);
  // Validates we have a webhook
  debug(
    'Validating SLACK_WEBHOOK_URL exists in the environment and includes https://hooks.slack.com',
  );
  if (slackWebhookUrl !== null && slackWebhookUrl.includes('https://hooks.slack.com')) {
    logger.log('Verify Slack Webhook Url Provided');
  } else {
    // Pushes an error if we are not provided a proper webhook
    debug('SLACK_WEBHOOK_URL failed validation, see error message for more details');
    errors.push(getError('EMISSINGSLACKWEBHOOKURL', {}));
  }

  /**
   * Validate if we have fullReleaseNotes passed in, otherwise default to false
   */
  debug('Validating if fullReleaseNotes is set.');
  if (pluginConfig.fullReleaseNotes === undefined) {
    debug('fullReleaseNotes not set, setting it to false');
    // eslint-disable-next-line no-param-reassign
    pluginConfig.fullReleaseNotes = false;
  }

  // Throw any errors we accumulated during the validation
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};
