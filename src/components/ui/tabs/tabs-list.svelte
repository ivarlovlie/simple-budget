<script lang="ts">
import { cn } from "$utils/ui.js";
import type { Tabs as TabsPrimitive } from "bits-ui";

type $$Props = TabsPrimitive.ListProps;

const className: $$Props["class"] = undefined;
export { className as class };
</script>

<TabsPrimitive.List
	class={cn('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground', className)}
	{...$$restProps}
>
	<slot />
</TabsPrimitive.List>
