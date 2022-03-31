import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extends: './.svelte-kit/tsconfig.json',
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app
			split: false,
		}),
		vite: {
			optimizeDeps: {
				include: ['highlight.js/lib/core'],
			},
		},
	},
};

export default config;
