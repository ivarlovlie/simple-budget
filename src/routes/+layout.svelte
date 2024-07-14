<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';

	import '../app.pcss';
	import Sonner from '$components/sonner.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import StyleChanger from '$components/style-changer.svelte';
</script>

<ParaglideJS {i18n}>
	<ModeWatcher />
	<Sonner />
	<StyleChanger />
	<main>
		<slot />
	</main>
</ParaglideJS>
