module.exports = {
  '*.js': [
    'prettier --write',
    'eslint --config=.eslintrc.js --fix --fix-type=problem,suggestion',
    'git add',
  ],
};
