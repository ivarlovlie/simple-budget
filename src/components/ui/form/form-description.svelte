<script lang="ts">
import { cn } from "$utils/ui.js";
import type * as FormPrimitive from "formsnap";

type $$Props = FormPrimitive.DescriptionProps;
const className: $$Props["class"] = undefined;
export { className as class };
</script>

<FormPrimitive.Description
	class={cn('text-[0.8rem] text-muted-foreground', className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
