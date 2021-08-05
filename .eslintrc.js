module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'airbnb/hooks',
        'plugin:eslint-plugin-react/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.tsx', '.ts', '.js', '.json'],
            },
        },
        typescript: {},
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'arrow-body-style': 0,
        'no-var': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
        'unicorn/prevent-abbreviations': 'off',
        'comma-dangle': [2, 'always-multiline'],
        'import/no-unresolved': 'error',
        'space-in-parens': 'off',
        'spaced-comment': 'off',
        'eol-last': 'off',
        quotes: [0, 'single'],
        semi: [2, 'always'],
        indent: 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
};