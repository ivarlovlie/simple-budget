import type { PageServerLoad, Actions } from './$types';
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from './+page.svelte';
import { fail } from "@sveltejs/kit";

export const load = (async () => {
    return {
        form: await superValidate(zod(loginSchema)),
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(loginSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        return {
            form,
        };
    },
};