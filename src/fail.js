const fetch = require('node-fetch');
const emoji = require('node-emoji');
// eslint-disable-next-line import/no-dynamic-require
const { pkg } = require('read-pkg-up').sync();
const payload = require('./definitions/payload');

/**
 * A lifecycle method for publishing to slack when a release fails
 */
module.exports = async (pluginConfig, context) => {
  const { env, logger } = context;

  logger.log('Posting failure message to Slack');
  await fetch(
    env.SLACK_WEBHOOK_URL,
    payload(
      `${emoji.get(
        'x',
      )} A failure occurred when attempting a release. Please check the CI job for ${pkg.name}.`,
    ),
  );
};
