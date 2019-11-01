import { Initialize } from './types';
import { initResourceLoader } from './resource-loader';

export const initDefaultAvatarizer: Initialize =
  async (param) => {
    const loadResources = initResourceLoader();
    const contents = await loadResources(param);
    console.log(contents);

    return async (seed, opts) => {
      return {
        path: ''
      };
    };
};