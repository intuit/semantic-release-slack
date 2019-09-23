const resolveConfig = require('../src/resolve-config');

describe('resolve-config', () => {
  test('gets slack webhook url from the env passed in', () => {
    const { slackWebhookUrl } = resolveConfig(
      {},
      {
        env: {
          SLACK_WEBHOOK_URL: 'https://hooks.slack.com',
        },
      },
    );
    expect(slackWebhookUrl).toMatch('https://hooks.slack.com');
  });

  test('retuns null if no environment variable provided', () => {
    const { slackWebhookUrl } = resolveConfig(
      {},
      {
        env: {},
      },
    );
    expect(slackWebhookUrl).toBe(null);
  });
});
