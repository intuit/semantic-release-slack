const debug = require('debug')('@intuit/semantic-release-slack');
const verify = require('./src/verify');
const successCall = require('./src/success');
const failCall = require('./src/fail');

let verified;

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function verifyConditions(pluginConfig, context) {
  await verify(pluginConfig, context);
  verified = true;
}

/**
 * Called by semantic-release during the success step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function success(pluginConfig, context) {
  debug(`Plugin Config for success: ${JSON.stringify(pluginConfig, null, 2)}`);
  if (!verified) {
    await verify(pluginConfig, context);
    verified = true;
  }

  await successCall(pluginConfig, context);
}

/**
 * Called by semantic-release during the fail step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function fail(pluginConfig, context) {
  if (!verified) {
    await verify(pluginConfig, context);
    verified = true;
  }

  await failCall(pluginConfig, context);
}

module.exports = { verifyConditions, success, fail };
