import { Initialize } from './types';
import { loadAndValidateResources } from './resource-loader';

export const initDefaultAvatarizer: Initialize =
  async (param) => {
    await loadAndValidateResources(param);

    return async (seed, opts) => {
      return {
        path: ''
      };
    };
};