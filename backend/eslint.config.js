// eslint.config.js

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Define global variables, if any
        browser: true,
        node: true,
      },
    },
    rules: {
      'no-console': 'off',
      'semi': ['error', 'always'],
    },
  },
];
