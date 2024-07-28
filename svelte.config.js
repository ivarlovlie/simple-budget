import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "svelte-adapter-bun";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess({})],
	kit: {
		adapter: adapter(),
		alias: {
			$components: "./src/components",
			$utils: "./src/utils",
			$strings: "./src/lib/paraglide/messages",
		},
	},
	vitePlugin: {
		inspector: {
			// Allows you to hold ctrl+shift and click on an item in the browser and it then
			// opens that components location in VSCode
			holdMode: true,
		},
	},
};

export default config;
