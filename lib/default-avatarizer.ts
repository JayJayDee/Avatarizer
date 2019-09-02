import { Initialize } from './types';

export const initDefaultAvatarizer: Initialize =
  async (param) => {

    return async (seed, opts) => {
      return {
        path: ''
      };
    };
};