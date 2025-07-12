module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'indent': ['error', 2],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'eqeqeq': ['error', 'always'],
    'no-console': ['warn', { allow: ['error'] }],
  },
};