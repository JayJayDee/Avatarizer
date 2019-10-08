import { Initialize } from './types';
import { initResourceLoader } from './resource-loader';

export const initDefaultAvatarizer: Initialize =
  async (param) => {
    const loadResources = initResourceLoader();
    const loaded = await loadResources();

    console.log(loaded);

    return async (seed, opts) => {
      return {
        path: ''
      };
    };
};