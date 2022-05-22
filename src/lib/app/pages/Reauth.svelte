<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchAuthToken } from '$lib/api/utils';
	import { getLogger } from '$lib/api/utils/logger';

	const logger = getLogger();
	logger.debug('processing bnet code');

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		await fetchAuthToken(params.get('code'));
		window.location.href = window.location.origin;
	});
</script>

<div>
	location: {$location} <br />
	query: {$querystring}
</div>
