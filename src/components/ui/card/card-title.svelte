<script lang="ts">
import { cn } from "$utils/ui";
import type { HTMLAttributes } from "svelte/elements";
import type { HeadingLevel } from "./index";

type $$Props = HTMLAttributes<HTMLHeadingElement> & {
	tag?: HeadingLevel;
};

const className: $$Props["class"] = undefined;
export const tag: $$Props["tag"] = "h3";
export { className as class };
</script>

<svelte:element this={tag} class={cn('font-semibold leading-none tracking-tight', className)} {...$$restProps}>
	<slot />
</svelte:element>
