<script context="module" lang="ts">
import { PASSWORD_REGEX, USERNAME_REGEX } from "$utils/validation";
import LoaderCircle from "svelte-lucide/LoaderCircle.svelte";
import { z } from "zod";

export const signUpSchema = z.object({
	username: z.string().min(3).max(24).regex(USERNAME_REGEX, m.errorInvalidUsername()),
	password: z.string().min(6).max(128).regex(PASSWORD_REGEX, m.errorInvalidPassword()),
	email: z.string().email(m.errorInvalidEmail()).optional().or(z.literal("")),
});

export type SignUpFormSchema = typeof signUpSchema;
</script>

<script lang="ts">
  import * as m from "$strings";
  import * as Form from "$components/ui/form";
  import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { Input } from "$components/ui/input";
  import { debounce } from "zeed";

  export let data: SuperValidated<Infer<SignUpFormSchema>>;

  const form = superForm(data, {
    validators: zodClient(signUpSchema),
    dataType: "json",
  });

  const { form: formData, enhance, errors, submitting } = form;

  const usernameInputForm = superForm(
    { username: $formData.username },
    {
      SPA: "?/check",
      onSubmit({ cancel, formData: fd }) {
        if (!$formData.username) cancel();
        fd.set("username", $formData.username as string);
      },
      onUpdated({ form }) {
        $errors.username = form.errors.username;
      },
    },
  );

  const checkUsername = debounce(usernameInputForm.submit, { delay: 300 });

  let showSubmitting = false
  let showSubmittingTimeout: number
  $: if ($submitting) {
    if (!showSubmittingTimeout) showSubmittingTimeout = window.setTimeout(() => {
      showSubmitting = true
    }, 100);
  } else {
    showSubmittingTimeout = 0
    showSubmitting = false
  }
</script>

<form method="POST" use:enhance action="?/create">
  <Form.Field {form} name="username">
    <Form.Control let:attrs>
      <Form.Label required={true}>{m.usernameLabel()}</Form.Label>
      <Input {...attrs} bind:value={$formData.username} on:input={checkUsername} on:blur={checkUsername} required />
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
    <Form.Button disabled={$submitting}>
      {#if $submitting}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
      {/if}
      {$submitting ? m.loading() : m.submit()}
    </Form.Button>
  </div>
</form>
