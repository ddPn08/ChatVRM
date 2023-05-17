module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:tailwindcss/recommended', 'prettier'],
  plugins: ['unused-imports', 'tailwindcss'],
  rules: {
    'react/jsx-curly-brace-presence': 2,
    'tailwindcss/no-custom-classname': 'off',
    'import/no-unresolved': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'off',
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
