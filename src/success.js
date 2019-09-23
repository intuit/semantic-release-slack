const fetch = require('node-fetch');
const emoji = require('node-emoji');
const { githubToSlack } = require('@atomist/slack-messages');
const debug = require('debug')('@intuit/semantic-release-slack:success');
// eslint-disable-next-line import/no-dynamic-require
const { pkg } = require('read-pkg-up').sync();
const getPlatformEmoji = require('./get-platform-emoji');
const payload = require('./definitions/payload');

/**
 * A lifecycle method for publishing to slack when a successful release occurs
 */
module.exports = async (pluginConfig, context) => {
  const { env, nextRelease, releases, logger, commits } = context;
  let githubReleaseNotesUrl = '';
  debug(`The options provided are ${JSON.stringify(pluginConfig, null, 2)}`);

  /**
   * Sanitizes the output of the markdown for github for slack.
   * Thanks to @hipstersmoothie via https://github.com/intuit/auto/blob/1ea30d3b48d94b71f293fbcebe70c88a311d9ef6/plugins/slack/src/index.ts#L6
   * @param {String} markdown the markdown for github to sanitize
   * @returns {String} markdown formatted for slack
   */
  const sanitizeMarkdown = (markdown) =>
    githubToSlack(markdown)
      .split('\n')
      .map((line) => {
        // Strip out the ### prefix and replace it with *<word>* to make it bold
        if (line.startsWith('#')) {
          return `*${line.replace(/^[#]+/, '')}*`;
        }

        return line;
      })
      .join('\n');

  // Options passed by the user
  const { skipCommit, fullReleaseNotes } = pluginConfig;
  // Types of changes to post for
  const semverFilter = pluginConfig.semverFilter || ['major', 'minor', 'patch'];
  // Check to see if the filter matches any types
  const semverFilterIncludesType = semverFilter.includes(nextRelease.type);
  // Skip posting if the skip commit is provided
  const hasSkipCommit =
    skipCommit &&
    commits.some((commit) => {
      return commit.subject.match(new RegExp(skipCommit));
    });
  debug(`hasSkipCommit=${hasSkipCommit}`);
  if (hasSkipCommit) {
    logger.log('Skipping posting Slack message due to matching "skipCommit" commit message');
    return;
  }
  debug(`semverFilterIncludesType=${semverFilterIncludesType}`);
  if (!semverFilterIncludesType) {
    logger.log(
      `Skipping posting Slack message due to semverFilter not containing a matching "${
        nextRelease.type
      }" item.`,
    );
    return;
  }
  // Format the output with the consumable platforms
  const consumablePlatforms = pluginConfig.platforms
    ? `The release is available on the following platforms:\n ${pluginConfig.platforms
        .map((platform) => {
          debug(`Getting emoji for platform ${platform}`);
          return `${getPlatformEmoji(platform)} ${platform}`;
        })
        .join('\n')}`
    : '';

  releases.forEach((release) => {
    // We want to grab the info from the github plugin
    if (release.pluginName.includes('github')) {
      // Sanitize the output of the release notes so it looks nice in slack
      githubReleaseNotesUrl = fullReleaseNotes
        ? sanitizeMarkdown(release.notes)
        : `${emoji.get('spiral_note_pad')} Release Notes: ${release.url}`;
    }
  });

  const slackMessage = `*${pkg.name}:* \`${nextRelease.version}\` is now available! ${emoji.get(
    'tada',
  )}\n
${githubReleaseNotesUrl}
${consumablePlatforms}`;

  debug(`The message to post to slack is ${slackMessage}`);
  debug(`The slack webhook is ${env.SLACK_WEBHOOK_URL}`);
  logger.log('Posting release message to Slack');
  await fetch(env.SLACK_WEBHOOK_URL, payload(slackMessage));
};
