import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://RambjorgRD2.github.io/AIQ',
  base: '/AIQ',
  integrations: [tailwind()],
});
