module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testRegex: '\\.test\\.js$',
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  }
};