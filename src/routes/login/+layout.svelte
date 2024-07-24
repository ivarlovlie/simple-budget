<script lang="ts">
import { page } from "$app/stores";
import * as Card from "$components/ui/card";
import * as m from "$strings";
</script>

<section class="full m-1 max-w-96 sm:m-4">
	<Card.Root>
		<Card.Header>
			{#if $page.url.pathname.includes('login/new')}
				<span class="card-header">
					<h1>{m.signUpHeading()}</h1>
					<a href="/login">{(m.or() + ' ' + m.loginHeading()).toLowerCase()}</a>
				</span>
			{:else}
				<span class="card-header">
					<h1>{m.loginHeading()}</h1>
					<a href="/login/new">{(m.or() + ' ' + m.signUpHeading()).toLowerCase()}</a>
				</span>
			{/if}
		</Card.Header>
		<Card.Content>
			<slot />
		</Card.Content>
	</Card.Root>
</section>

<style lang="postcss">
	.card-header {
		display: flex;
		flex-direction: row;
		align-items: baseline;

		h1 {
			@apply scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl;
		}

		a {
			@apply pl-2 text-sm text-muted-foreground;

			&:hover,
			&:active,
			&:focus {
				@apply text-foreground transition-colors;
			}
		}
	}
</style>
