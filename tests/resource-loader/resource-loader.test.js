const rewire = require('rewire');
const loaderModule = rewire('../../lib/resource-loader.ts');

describe('resource-loader::validateGroup() tests', () => {
  const validateGroup = loaderModule.__get__('validateGroup');

  test('loader dummy tests', () => {
    console.log(validateGroup);
  });
});