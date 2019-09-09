import { initResourceLoader } from "../../lib/resource-loader";

describe('resource-loader/index tests()', () => {
  const groupNames = [
    'body-shapes',
    'clothes',
    'face-shapes',
    'face-components',
    'hairs'
  ];

  test('if the readResources() throws error, must be throw error', () => {
    const readResources = (path) =>
      new Promise((resolve, reject) =>
        reject(new Error('test error')));

    const load = initResourceLoader({ readResources });
    expect(load()).toReject();
  });

  test('if the validate() throws error, must be throw error', () => {
    const readResources = (path) =>
      new Promise((resolve, reject) =>
        resolve(['a', 'b']));

    const validate = (grp) =>
      new Promise((resolve, reject) =>
        reject(new Error('test error')));

    const load = initResourceLoader({ readResources, validate });
    expect(load()).toReject();
  });

  test('if every function passes, the results must be matched', () => {
    const readResources = (path) =>
      new Promise((resolve, reject) =>
        resolve(['a', 'b']));

    const validate = (grp) =>
      new Promise((resolve, reject) => resolve());

      const load = initResourceLoader({ readResources, validate });
      load({ resourcePath: 'test' })
      .then((resp) => {
        resp.forEach((r) => {
          expect(groupNames.includes(r.name)).toEqual(true);
          expect(r.contents.length).toBe(2);
        });
      })
      .catch((err) => {
        throw err;
      });
  });
});