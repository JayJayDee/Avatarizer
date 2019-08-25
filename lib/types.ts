type AvatarizerOpts = {
  resourcePath?: string;
};
type Avatarized = {
  path: string;
};
export type Avatarize = (seed?: number, opts?: AvatarizerOpts) => Promise<Avatarized>;


type AvatarizerInitOpts = {
  resourcePath?: string;
};
export type Initialize = (opts?: AvatarizerInitOpts) => Promise<Avatarize>;