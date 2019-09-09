import { join, extname } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';
import { readResourcesInDir, validateGroup, loadAndValidateResources } from './file-resource-loader';

type Group = {
  name: string;
  contents: string[];
};

export const initResourceLoader = ({
  readResources,
  validate
}: {
  readResources: (path: string) => Promise<string[]>,
  validate: (grp: Group) => Promise<void>
}) => {
  if (!readResources) {
    const readDirAsync = promisify(readdir);
    readResources = readResourcesInDir({ readDirAsync, join });
  }
  if (!validate) {
    const statAsync = promisify(stat);
    validate = validateGroup({ statAsync, extName: extname });
  }
  return loadAndValidateResources({ readResources, validate, join });
};