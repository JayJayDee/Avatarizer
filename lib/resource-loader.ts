import { promisify } from 'util';
import { join, extname } from 'path';
import { readdir, stat, Stats } from 'fs';
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

    const readDirAsync = promisify(readdir);
    const readRes = readResourcesInDir({ readDirAsync });

    // 1. read resource groups from resource root.
    const promises = groupNames.map((d) =>
      readRes(join(resourceRoot, d))
        .then((contents) => ({
          name: d,
          contents
        })));

    // 2. validate each groups.
    const groups = await Promise.all(promises);

    const statAsync = promisify(stat);

    const validate = validateGroup({ statAsync, extName: extname });
    await Promise.all(groups.map(validate));
  };

export const validateGroup =
  ({ statAsync, extName }:
    { statAsync: (path: string) => Promise<Stats>,
      extName: (path: string) => string }) =>

      async (grp: Group) => {
        const promises = grp.contents
          .map((path) =>
            statAsync(path).then((s) => {
              if (s.isFile() === false) throw new MalformedResourceError(`sub contents of resources are must be file: ${path}`);
              if (extName(path).toUpperCase() !== '.PNG') throw new MalformedResourceError(`resource must be png file: ${path}`);
            }));
        await Promise.all(promises);
      };

const readResourcesInDir =
  ({ readDirAsync }:
    { readDirAsync: (path: string) => Promise<string[]> }) =>

    async (path: string) => {
      const contents = await readDirAsync(path);
      return contents.map((c) => join(path, c));
    };