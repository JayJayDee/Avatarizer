import { Avatarize } from './types';

export const defaultAvatarizer: Avatarize =
  async (seed, opts) => {
    return {
      path: ''
    };
  };