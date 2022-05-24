<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import ManifestContainer from './_manifestContainer.svelte';

	const client = new QueryClient();
</script>

<QueryClientProvider {client}>
	<ManifestContainer>
		<slot />
	</ManifestContainer>
</QueryClientProvider>
