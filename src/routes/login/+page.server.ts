import { db } from "$lib/db";
import { user } from "$lib/db/schema/user";
import { fail } from "@sveltejs/kit";
import { count, eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { randomInt, sleep } from "zeed";
import type { Actions, PageServerLoad } from "./$types";
import { loginSchema } from "./+page.svelte";

export const load = (async () => {
	return {
		form: await superValidate(zod(loginSchema)),
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const fillerResponseMs = randomInt(500, 100);
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const dbUserQueryResult = await db
			.select({ count: count(), password: user.password })
			.from(user)
			.where(eq(user.name, form.data.username));
		const found = (dbUserQueryResult?.at(0)?.count ?? 0) === 1;
		if (!found) {
			await sleep(fillerResponseMs);
			return fail(400, { form });
		}
		const { verify } = new Argon2id();
		const passwordHash = dbUserQueryResult.at(0)?.password;
		if (passwordHash && (await verify(passwordHash, form.data.password))) {
		}
		return {
			form,
		};
	},
};
