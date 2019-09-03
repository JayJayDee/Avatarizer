import { Stats } from 'fs';
import { MalformedResourceError } from '../errors';

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
  ({ readResources, join, validate }:
    {
      readResources: (path: string) => Promise<string[]>,
      join: (...args: string[]) => string,
      validate: (grp: Group) => Promise<void>
    }) =>
    async (param?: LoaderParam) => {
      let resourceRoot = __dirname;
      if (param && param.resourcePath) resourceRoot = param.resourcePath;

      // 1. read resource groups from resource root.
      const promises = groupNames.map((d) =>
        readResources(join(resourceRoot, d))
          .then((contents) => ({
            name: d,
            contents
          })));

      // 2. validate each groups.
      const groups = await Promise.all(promises);
      await Promise.all(groups.map(validate));

      // 3. return groups.
      return groups;
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

export const readResourcesInDir =
  ({ readDirAsync, join }:
    { readDirAsync: (path: string) => Promise<string[]>,
      join: (...args: any[]) => string }) =>

    async (path: string) => {
      const contents = await readDirAsync(path);
      return contents.map((c) => join(path, c));
    };