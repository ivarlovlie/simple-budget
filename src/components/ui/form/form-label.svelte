<script lang="ts">
import { Label } from "$components/ui/label/index.js";
import * as m from "$strings";
import { cn } from "$utils/ui";
import type { Label as LabelPrimitive } from "bits-ui";
import { getFormControl } from "formsnap";

type $$Props = LabelPrimitive.Props & { required?: boolean };

const className: $$Props["class"] = undefined;
export { className as class };

export const required: boolean = false;

const { labelAttrs } = getFormControl();
</script>

<Label
	{...$labelAttrs}
	class={cn('data-[fs-error]:text-destructive', className)}
	{...$$restProps}
	aria-required={required ?? false}
	title={$$restProps.title ? $$restProps.title + '. ' + m.requiredField() : m.requiredField()}
>
	<slot {labelAttrs} />
	{#if required ?? false}
		<span class="text-red-500">&ast;</span>
	{/if}
</Label>
