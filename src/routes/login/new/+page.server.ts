import type { PageServerLoad, Actions } from './$types';
import { superValidate } from "sveltekit-superforms";
import { fail } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { signUpSchema } from "./+page.svelte"

export const load = (async () => {
    return {
        form: await superValidate(zod(signUpSchema)),
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(signUpSchema));

        console.log(form);

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