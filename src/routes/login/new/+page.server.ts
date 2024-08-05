import { db } from "$lib/db";
import { user } from "$lib/db/schema/user";
import { serverlog } from "$utils/loggers/server";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { signUpSchema } from "./+page.svelte";

export const load = (async () => {
	return {
		form: await superValidate(zod(signUpSchema)),
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signUpSchema));

		serverlog.info("Server log");

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await db.insert(user).values({
			email: form.data.email,
			name: form.data.username,
			password: form.data.password,
		});

		return {
			form,
		};
	},
};
