import { promisify } from 'util';
import { join, extname } from 'path';
import { readdir, stat } from 'fs';
import { MalformedResourceError } from './errors';

type LoaderParam = {
  resourcePath?: string;
};

type Group = {
  name: string;
  contents: string[];
};

const groupNames = [
  'body-shapes',
  'clothes',
  'face-shapes',
  'face-components',
  'hairs'
];

export const loadAndValidateResources =
  async (param?: LoaderParam) => {
    let resourceRoot = __dirname;
    if (param && param.resourcePath) resourceRoot = param.resourcePath;

    const promises = groupNames.map((d) =>
      readResourcesInDir(join(resourceRoot, d))
        .then((contents) => ({
          name: d,
          contents
        })));
    const subpathes = await Promise.all(promises);
    await Promise.all(subpathes.map(validateGroup));
  };

const validateGroup = async (grp: Group) => {
  const statAsync = promisify(stat);
  const promises = grp.contents
    .map((path) =>
      statAsync(path).then((s) => {
        if (s.isFile() === false) throw new MalformedResourceError(`sub contents of resources are must be file: ${path}`);
        if (extname(path).toUpperCase() !== 'PNG') throw new MalformedResourceError(`resource must be png file: ${path}`);
      }));
  await Promise.all(promises);
};

const readResourcesInDir =
  async (path: string) => {
    const readDirAsync = promisify(readdir);
    const contents = await readDirAsync(path);
    return contents.map((c) => join(path, c));
  };