const errors = require('../../src/definitions/errors');

describe('errors', () => {
  test('errors matches snapshot of errors', () => {
    expect(errors).toMatchSnapshot();
  });

  test('errors matches snapshot of errors', () => {
    expect(errors.EMISSINGSLACKWEBHOOKURL()).toMatchSnapshot();
  });
});
