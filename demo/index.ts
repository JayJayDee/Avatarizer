import { avatarize } from '../lib';

(async () => {
  const res = await avatarize();
  console.log(res);
})();