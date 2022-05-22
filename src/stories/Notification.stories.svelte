<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import ErrorNotification from '$lib/app/ErrorBoundary/ErrorNotification.svelte';
</script>

<Meta
	title="Components/ErrorNotification"
	component={ErrorNotification}
	argTypes={{
		name: { control: 'text' },
		message: { control: 'text' },
		status: { control: 'number' }
	}}
/>

<Template let:args>
	<ErrorNotification
		error={{
			name: args.name,
			message: args.message,
			status: args.status
		}}
	/>
</Template>

<Story
	name="Error"
	args={{
		name: 'Error name',
		message: 'Error description'
	}}
/>

<Story
	name="With status"
	args={{
		name: 'Error name',
		message: 'Error description',
		status: 400
	}}
/>

<Story
	name="Bungie Error"
	args={{
		name: 'BungieError',
		message: 'Error description',
		status: 400
	}}
/>
