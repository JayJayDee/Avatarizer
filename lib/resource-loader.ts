import { promisify } from 'util';
import { join } from 'path';
import { readdir } from 'fs';

const directories = [
  'body-shapes',
  'clothes',
  'face-shapes',
  'face-components',
  'hairs'
];

type LoaderParam = {
  resourcePath?: string;
};

export const loadAndValidateResources =
  async (param?: LoaderParam) => {
    let resourceRoot = __dirname;
    if (param && param.resourcePath) resourceRoot = param.resourcePath;

    const promises = directories.map((d) =>
      readResourcesInDir(join(resourceRoot, d)));
    const subpathes = await Promise.all(promises);
    console.log(subpathes);
  };

const readResourcesInDir =
  async (path: string) => {
    const readDirAsync = promisify(readdir);
    return await readDirAsync(path);
  };