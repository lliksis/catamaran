<script>
	import { getAuthorizationURL } from '$lib/api/utils/login';
	import LoginButton from './LoginButton.svelte';

	const href = getAuthorizationURL();
</script>

<LoginButton {href} />
