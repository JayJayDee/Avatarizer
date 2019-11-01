import { join } from 'path';
import { initAvatarizer } from '../lib';

(async () => {
  const resourcePath = join(__dirname, 'demo-resources');
  console.log(resourcePath);

  const avatarize = await initAvatarizer({ resourcePath });
  const res = await avatarize();
  console.log(res);
})();