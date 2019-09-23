const payload = require('../../src/definitions/payload');

describe('payload', () => {
  test('payload matches snapshot of errors', () => {
    expect(payload('message')).toMatchSnapshot();
  });
});
