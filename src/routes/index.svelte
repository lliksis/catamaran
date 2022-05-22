<script lang="ts">
	import { getAuthorizationURL } from '$lib/api/utils';
	import LoginButton from '$lib/app/login/LoginButton.svelte';

	const href = getAuthorizationURL();
</script>

<div>
	<h1>Welcome to Catamaran</h1>
	<LoginButton {href} />
</div>
