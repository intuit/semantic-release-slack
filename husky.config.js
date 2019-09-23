module.exports = {
  hooks: {
    'commit-msg': 'commitlint -e $GIT_PARAMS',
    'pre-commit': 'lint-staged',
    'post-checkout': '',
    'pre-push': 'yarn lint && yarn test',
  },
};
