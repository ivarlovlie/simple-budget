<script lang="ts">
import { cn } from "$utils/ui";
import type { HTMLAttributes } from "svelte/elements";

type $$Props = HTMLAttributes<HTMLParagraphElement>;

const className: $$Props["class"] = undefined;
export { className as class };
</script>

<p class={cn('text-sm text-muted-foreground', className)} {...$$restProps}>
	<slot />
</p>
