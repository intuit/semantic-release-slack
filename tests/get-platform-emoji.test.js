const emoji = require('node-emoji');
const getPlatformEmoji = require('../src/get-platform-emoji');

describe('get-platform-emojis', () => {
  test('matches a string with all caps', () => {
    expect(getPlatformEmoji('BREW')).toMatch(emoji.get('beer'));
  });

  test('matches a string with some caps', () => {
    expect(getPlatformEmoji('bReW')).toMatch(emoji.get('beer'));
  });

  test('returns beer glass for brew', () => {
    expect(getPlatformEmoji('brew')).toMatch(emoji.get('beer'));
  });

  test('returns package for npm', () => {
    expect(getPlatformEmoji('npm')).toMatch(emoji.get('package'));
  });

  test('returns cat2 for yarn', () => {
    expect(getPlatformEmoji('yarn')).toMatch(emoji.get('cat2'));
  });

  test('returns whale for docker', () => {
    expect(getPlatformEmoji('docker')).toMatch(emoji.get('whale'));
  });

  test('returns empty string if no match', () => {
    expect(getPlatformEmoji('no-match')).toMatch('');
  });
});
