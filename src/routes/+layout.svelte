<script lang="ts">
import { i18n } from "$lib/i18n";
import { ParaglideJS } from "@inlang/paraglide-sveltekit";

import "../app.pcss";
import LangChanger from "$components/lang-changer/index.svelte";
import Sonner from "$components/sonner.svelte";
import StyleChanger from "$components/style-changer.svelte";
import { ModeWatcher } from "mode-watcher";
</script>

<ParaglideJS {i18n}>
	<ModeWatcher />
	<Sonner />
	<aside class="fixed right-0 top-0 flex">
		<LangChanger />
		<StyleChanger />
	</aside>
	<main>
		<slot />
	</main>
</ParaglideJS>
