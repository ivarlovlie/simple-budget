import { paraglide } from "@inlang/paraglide-sveltekit/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		paraglide({ project: "./project.inlang", outdir: "./src/lib/paraglide" }),
		sveltekit(),
	],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
	css: {
		postcss: {
			plugins: [
				//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
				tailwindcss(),
				//But others, like autoprefixer, need to run after,
				autoprefixer,
			],
		},
	},
});
