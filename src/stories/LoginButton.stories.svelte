<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Button from '$lib/app/login/LoginButton.svelte';
</script>

<Meta
	title="Components/LoginButton"
	component={Button}
	argType={{
		href: { controle: 'text' }
	}}
/>

<Template let:args>
	<Button href={args.href} />
</Template>

<Story name="Login Button" />
