import { join, extname } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';
import { readResourcesInDir, validateGroup, loadAndValidateResources } from './file-resource-loader';

export const initResourceLoader = ({
  readDirSync
}) => {
  const readDirAsync = promisify(readdir);
  const statAsync = promisify(stat);

  const readResources = readResourcesInDir({ readDirAsync, join });
  const validate = validateGroup({ statAsync, extName: extname });

  const loadResources = loadAndValidateResources({ readResources, validate, join });
  return loadResources;
};