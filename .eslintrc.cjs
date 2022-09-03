/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'always' ],
    'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
    'indent': [ 'error', 2 ],
    'linebreak-style': [ 'error', 'unix' ],
    'max-len': [ 'error', {
      'code': 120,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    } ],
    'no-empty-function': 'off',
    'no-mixed-operators': 'off',
    'no-multiple-empty-lines': [ 'error', { 'max': 1 } ],
    'no-trailing-spaces': [ 'error' ],
    'no-use-before-define': 'off',
    'object-curly-spacing': [ 'error', 'always' ],
    'quote-props': [ 'error', 'consistent' ],
    'quotes': [ 'error', 'single' ],
    'semi': 'off',
    'space-before-blocks': [ 'error', 'always' ],
    'space-before-function-paren': [ 'error', {
      'anonymous': 'always',
      'asyncArrow': 'always',
      'named': 'never',
    } ],

    '@typescript-eslint/explicit-member-accessibility': [ 'error', { 'accessibility': 'explicit' } ],
    '@typescript-eslint/member-delimiter-style': [ 'error' ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [ 'error', { 'argsIgnorePattern': '^unused_' } ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/semi': [ 'error', 'always', { 'omitLastInOneLineBlock': true } ],
  },
};
