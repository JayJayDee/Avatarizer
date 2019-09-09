import {
  validateGroup,
  readResourcesInDir,
  loadAndValidateResources
} from '../../lib/resource-loader/file-resource-loader';

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
        isFile: () => true
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
      statAsync: statAsyncIsFile,
      extName: extNameNotPng
    });

    const grp = {
      name: 'test-name',
      contents: [
        'a', 'b'
      ]
    };

    expect(validate(grp)).rejects.toBeInstanceOf(Error);
  });

  test('when the nested contents have no problem, whether it\'s capital case or not, must be passed', () => {
    const validate = validateGroup({
      statAsync: statAsyncIsFile,
      extName: extNamePng
    });

    const validate2 = validateGroup({
      statAsync: statAsyncIsFile,
      extName: extNamePngCapitalCase
    });

    const grp = {
      name: 'test-name',
      contents: [
        'a', 'b'
      ]
    };

    expect(() => validate(grp)).not.toThrow();
    expect(() => validate2(grp)).not.toThrow();
  });
});


describe('resource-loader::readResourcesInDir() tests', () => {
  const readDirAsync = (path) =>
    new Promise((resolve, reject) =>
      resolve(['a', 'b', 'c']));

  test('path and its contents must be merged', () => {
    const join = (...args) => `${args[0]}${args[1]}`;
    const readDir = readResourcesInDir({ readDirAsync, join });
    expect(readDir('a')).resolves.toStrictEqual(['aa', 'ab', 'ac']);
  });

  test('number of readResourcesIndir() must be same as number of  readDirAsync() result.', () => {
    const join = (...args) => `${args[0]}${args[1]}`;
    const readDir = readResourcesInDir({ readDirAsync, join });
    expect(readDir('a')).resolves.toHaveLength(3);
  });
});


describe('resource-loader::loadAndValidateResources() tests', () => {
  const groupNames = [
    'body-shapes',
    'clothes',
    'face-shapes',
    'face-components',
    'hairs'
  ];

  const join = (...args) => args.join('/');

  const validatePass = (grp) =>
    new Promise((resolve, reject) => resolve({}));

  const validateNotPass = (grp) => 
    new Promise((resolve, reject) => {
      throw new Error('test error');
    });

  test('if the resourceRoot path provided, readResource() must be supplied that', () => {
    const readResourcesTest = (path) =>
      new Promise((resolve, reject) => {
        const splited = path.split('/');
        expect(splited[0]).toBe('test');
        resolve([]);
      });
      
    const loadAndValidate = loadAndValidateResources({
      join,
      readResources: readResourcesTest,
      validate: validatePass
    });

    expect(loadAndValidate({ resourcePath: 'test' })).toResolve();
  });

  test('if there is a exception in validateGroup(), must be throw exception', () => {
    const readResourcesTest = () =>
      new Promise((resolve) => [
        'test',
        'test2'
      ]);

    const loadAndValidate = loadAndValidateResources({
      join,
      readResources: readResourcesTest,
      validate: validateNotPass
    });

    expect(loadAndValidate({ resourcePath: 'test' })).toReject();
  });

  test('if all sub-functions passes, the result must resolved', () => {
    const readResourcesTest = (path) =>
      new Promise((resolve) => resolve(
        groupNames.map((g) => `${path}/`)
      ));

    const loadAndValidate = loadAndValidateResources({
      join,
      readResources: readResourcesTest,
      validate: validateNotPass
    });
  });
});