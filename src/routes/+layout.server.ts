import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ url }) => {
	if (url.pathname === "/") await redirect(302, "/login");
	return {};
}) satisfies LayoutServerLoad;
