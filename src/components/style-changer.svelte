<script lang="ts">
import { Button } from "$components/ui/button";
import * as DropdownMenu from "$components/ui/dropdown-menu";
import * as m from "$strings";
import { resetMode, setMode } from "mode-watcher";
import Moon from "svelte-radix/Moon.svelte";
import Sun from "svelte-radix/Sun.svelte";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span class="sr-only">{m.chooseTheme()}</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => setMode('light')} title={m.useLightTheme()}>Light</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => setMode('dark')} title={m.useDarkTheme()}>Dark</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => resetMode()} title={m.useSystemTheme()}>System</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
