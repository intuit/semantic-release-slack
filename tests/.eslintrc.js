const baseConfig = require('../.eslintrc.js');

baseConfig.plugins.push('jest');
baseConfig.env = {
  'jest/globals': true,
};

module.exports = baseConfig;
