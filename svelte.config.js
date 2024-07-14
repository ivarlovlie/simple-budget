import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({})],
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$utils: './src/utils',
			$strings: "./src/lib/paraglide/messages"
		}
	}
};

export default config;
