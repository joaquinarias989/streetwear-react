module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 'error',
    'react/require-default-props': 'error',
    'react/display-name': 'off',
    'newline-before-return': 'error',
    'import/newline-after-import': [
      'error',
      {
        count: 1
      }
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['export'], next: ['*'] },
      {
        blankLine: 'always',
        prev: ['*'],
        next: ['multiline-const', 'multiline-let', 'multiline-var', 'export']
      }
    ]
  }
}
