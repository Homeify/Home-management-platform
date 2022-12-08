module.exports = {
    'env': {
      'browser': true,
      'es2021': true,
    },
    'extends': [
      'plugin:react/recommended',
      'google',
    ],
    'overrides': [
    ],
    'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
    },
    'plugins': [
      "react", "only-warn"
    ],
    'rules': {
      'require-jsdoc': 0,
      'max-len': ['error', {'code': 350}],
      'react/prop-types': 'off',
      'react/no-unused-vars': 'off',
      'linebreak-style': 'off',
      'object-curly-spacing': 'off',
      'comma-dangle': 'off'
    },
  };