<script context="module" lang="ts">
import { z } from "zod";

export const signUpSchema = z.object({
	username: z.string(),
	password: z.string(),
	email: z.string().email(m.invalidEmail()).optional().or(z.literal("")),
});

export type SignUpFormSchema = typeof signUpSchema;
</script>

<script lang="ts">
	import * as Form from '$components/ui/form';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as m from '$strings';
	import { Input } from '$components/ui/input';

	export let data: SuperValidated<Infer<SignUpFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(signUpSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label required={true}>{m.usernameLabel()}</Form.Label>
			<Input {...attrs} bind:value={$formData.username} required />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label required={true}>{m.passwordLabel()}</Form.Label>
			<Input {...attrs} bind:value={$formData.password} type="password" required />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>{m.emailLabel()}</Form.Label>
			<Input {...attrs} bind:value={$formData.email} inputmode="email" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="flex w-full justify-end">
		<Form.Button>{m.submit()}</Form.Button>
	</div>
</form>
