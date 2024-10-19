import { lucia } from "$lib/auth";
import { db } from "$lib/db";
import { usernameIsUnique } from "$lib/db/queries/user";
import { user } from "$lib/db/schema/user";
import * as m from "$strings";
import { normalisedUsername } from "$utils/validation";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import postgres from "postgres";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { signUpSchema } from "./+page.svelte";

export const load = (async () => {
	return {
		form: await superValidate(zod(signUpSchema)),
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(signUpSchema));

		if (!form.valid) {
			throw fail(400, {
				form,
			});
		}

		const { hash } = new Argon2id();

		try {
			const dbUser = await db
				.insert(user)
				.values({
					name: form.data.username as string,
					email: form.data.email as string,
					role: "customer",
					password: await hash(form.data.password as string),
				})
				.returning();
			if (!dbUser[0].id) throw new Error("Adding user to db did not return correct data");
			const session = await lucia.createSession(dbUser[0].id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes,
			});
		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				if (e.constraint_name === "user_name_unique") {
					form.errors.username = [m.errorUsernameExists()];
					throw fail(400, {
						form,
					});
				}
				// TODO
				// form.errors.system = [m.errorUnexpectedSystem()];
				throw fail(500, { form });
			}
		}

		throw redirect(302, "/dashboard?new");
	},
	check: async ({ request }) => {
		const form = await superValidate(request, zod(signUpSchema.pick({ username: true })));

		if (!form.valid) return fail(400, { form });

		if (form.data.username && !(await usernameIsUnique(normalisedUsername(form.data.username as string)))) {
			setError(form, "username", m.errorUsernameExists());
		}

		return { form };
	},
};
