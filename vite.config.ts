import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler', // or "modern"
			},
		},
	},
};
export default config;
