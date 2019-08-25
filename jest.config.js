module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testRegex: '\\.test\\.js$',
  moduleFileExtensions: ['js'],
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  }
};