<script lang="ts">
import { page } from "$app/stores";
import { Button } from "$components/ui/button";
import * as DropdownMenu from "$components/ui/dropdown-menu";
import { i18n } from "$lib/i18n";
import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";
import * as m from "$strings";
import FlagNorway from "./flag-norway.svelte";
import FlagUsa from "./flag-usa.svelte";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon">
      <span class="sr-only">{m.chooseLanguage()}</span>
      {#if languageTag() == "nb"}
        <FlagNorway />
      {:else}
        <FlagUsa />
      {/if}
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    {#each availableLanguageTags as lang}
      <DropdownMenu.Item asChild>
        <a
          href={i18n.route($page.url.pathname)}
          hreflang={lang}
          aria-current={lang === languageTag() ? "page" : undefined}
          class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50"
          title={lang == "nb" ? m.useNbLang() : m.useEnLang()}
        >
          {#if lang == "nb"}
            <FlagNorway />
            <span>Norsk bokmål</span>
          {:else}
            <FlagUsa />
            <span>English</span>
          {/if}
        </a>
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
