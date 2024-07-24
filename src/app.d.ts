import type { ParaglideLocals } from "@inlang/paraglide-sveltekit";
import type { AvailableLanguageTag } from "../../lib/paraglide/runtime";
/// <reference types="svelte" />

// See https://kit.svelte.dev/docs/types#app
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			paraglide: ParaglideLocals<AvailableLanguageTag>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
