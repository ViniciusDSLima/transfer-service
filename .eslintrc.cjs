module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        'quotes': ['error', 'double'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'no-console': 'warn',
        'no-unused-vars': 'warn',
    }
};