import { paraglide } from "@inlang/paraglide-sveltekit/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [paraglide({ project: "./project.inlang", outdir: "./src/lib/paraglide" }), sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
	resolve: {
		preserveSymlinks: true,
	},
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer, postcssNesting],
		},
	},
	server: {
		hmr: {
			host: "localhost",
			protocol: "ws",
		},
	},
});
