type AvatarizerOpts = {
  resourcePath?: string;
};

type Avatarized = {
  path: string;
};

export type Avatarize = (seed?: number, opts?: AvatarizerOpts) => Promise<Avatarized>;