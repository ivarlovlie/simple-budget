import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async (event) => {
	switch (event.url.pathname) {
		case "/":
			if (!event.locals.user) throw redirect(302, "/login");
			throw redirect(302, "/dashboard");
		default:
			break;
	}
	return {};
}) satisfies LayoutServerLoad;
