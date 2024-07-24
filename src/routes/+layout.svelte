<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';

	import '../app.pcss';
	import Sonner from '$components/sonner.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import StyleChanger from '$components/style-changer.svelte';
	import LangChanger from '$components/lang-changer/index.svelte';
</script>

<ParaglideJS {i18n}>
	<ModeWatcher />
	<Sonner />
	<aside class="flex fixed right-0 top-0">
		<LangChanger />
		<StyleChanger />
	</aside>
	<main>
		<slot />
	</main>
</ParaglideJS>
