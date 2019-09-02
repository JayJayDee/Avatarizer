const { validateGroup } = require('../../lib/resource-loader');

describe('resource-loader::validateGroup() tests', () => {

  const statAsyncIsNotFile = (path) =>
    new Promise((resolve, reject) => {
      const a = {
        isFile: () => false
      };
      resolve(a);
    });

  const statAsyncIsFile = (path) =>
    new Promise((resolve, reject) => {
      const a = {
        isFile: () => false
      };
      resolve(a);
    });

  const extNameNotPng = (path) => '.jpg';

  const extNamePng = (path) => '.png';

  const extNamePngCapitalCase = (path) => '.PNG';

  test('when the nested content of directory was not file, must be throw error', () => {
    const validate = validateGroup({
      statAsync: statAsyncIsNotFile,
      extName: extNameNotPng
    });

    const grp = {
      name: 'test-name',
      contents: [
        'a', 'b'
      ]
    };

    validate(grp).then(() => {
      expect().nthCalledWith(0);
    }).catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });

  test('when the nested content wasn\'t a PNG file, must be throw error', () => {
    const validate = validateGroup({
      statAsync: statAsyncIsNotFile,
      extName: extNamePng
    });

    const grp = {
      name: 'test-name',
      contents: [
        'a', 'b'
      ]
    };

    validate(grp).then(() => {
      expect().nthCalledWith(0);
    }).catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});