import { join } from 'path';
import { initAvatarizer } from '../lib';

(async () => {
  const res = await initAvatarizer({
    resourcePath: join(__dirname, 'demo-resources')
  });
  await res();
})();