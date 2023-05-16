module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'plugin:import/typescript', 'prettier'],
  plugins: ['unused-imports'],
  rules: {
    'react/jsx-curly-brace-presence': 2,
    'import/no-unresolved': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [['builtin', 'external', 'internal'], ['parent', 'sibling', 'index'], ['object']],
        'newlines-between': 'always',
      },
    ],
  },
}
