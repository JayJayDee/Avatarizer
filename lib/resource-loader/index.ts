import { join, extname } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';
import { readResourcesInDir, validateGroup, loadAndValidateResources } from './file-resource-loader';

type Group = {
  name: string;
  contents: string[];
};

type Param = {
  readResources: (path: string) => Promise<string[]>;
  validate: (grp: Group) => Promise<void>;
};

export const initResourceLoader = (param?: Param) => {
  let readResources = null;
  let validate = null;

  if (param) {
    readResources = param.readResources;
    validate = param.validate;
  }

  if (!param || !param.readResources) {
    const readDirAsync = promisify(readdir);
    readResources = readResourcesInDir({ readDirAsync, join });
  }

  if (!param || !param.validate) {
    const statAsync = promisify(stat);
    validate = validateGroup({ statAsync, extName: extname });
  }
  return loadAndValidateResources({ readResources, validate, join });
};