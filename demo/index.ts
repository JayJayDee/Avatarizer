import { initAvatarizer } from '../lib';

(async () => {
  const res = await initAvatarizer();
  console.log(res);
})();