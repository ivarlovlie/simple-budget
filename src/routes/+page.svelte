<script lang="ts">
	import * as Card from '$components/ui/card'
	import * as Tabs from '$components/ui/tabs'
</script>

<section>
	<Card.Root>
		<Card.Header>
			<Card.Title>Card Title</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<Tabs.Root value="account" class="w-[400px]">
				<Tabs.List>
					<Tabs.Trigger value="account"></Tabs.Trigger>
					<Tabs.Trigger value="password">Password</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
				<Tabs.Content value="password">Change your password here.</Tabs.Content>
			</Tabs.Root>
		</Card.Content>
	</Card.Root>
</section>
