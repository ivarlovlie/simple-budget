<script lang="ts">
import { cn, flyAndScale } from "$utils/ui";
import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

type $$Props = DropdownMenuPrimitive.SubContentProps;

const className: $$Props["class"] = undefined;
export const transition: $$Props["transition"] = flyAndScale;
export const transitionConfig: $$Props["transitionConfig"] = {
	x: -10,
	y: 0,
};
export { className as class };
</script>

<DropdownMenuPrimitive.SubContent
	{transition}
	{transitionConfig}
	class={cn(
		'z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-lg focus:outline-none',
		className
	)}
	{...$$restProps}
	on:keydown
	on:focusout
	on:pointermove
>
	<slot />
</DropdownMenuPrimitive.SubContent>
