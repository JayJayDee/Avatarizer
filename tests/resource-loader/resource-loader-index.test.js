import { initResourceLoader } from "../../lib/resource-loader";

describe('resource-loader/index tests()', () => {

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
        resolve(['a', 'b', 'c']));

    const validate = (grp) =>
      new Promise((resolve, reject) =>
        reject(new Error('test error')));

    const load = initResourceLoader({ readResources, validate });
    expect(load()).toReject();
  });
});