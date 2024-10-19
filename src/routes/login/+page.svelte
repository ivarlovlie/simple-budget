<script context="module" lang="ts">
import { z } from "zod";

export const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export type LoginFormSchema = typeof loginSchema;
</script>

<script lang="ts">
  import * as Form from "$components/ui/form";
  import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import * as m from "$strings";
  import { Input } from "$components/ui/input";
  import LoaderCircle from "svelte-lucide/LoaderCircle.svelte";

  export let data: SuperValidated<Infer<LoginFormSchema>>;

  const form = superForm(data, {
    validators: zodClient(loginSchema),
    dataType: "json",
  });

  const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="username">
    <Form.Control let:attrs>
      <Form.Label>{m.usernameLabel()}</Form.Label>
      <Input {...attrs} bind:value={$formData.username} required />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>{m.passwordLabel()}</Form.Label>
      <Input {...attrs} bind:value={$formData.password} type="password" required />
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
