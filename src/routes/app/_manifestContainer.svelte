<!--
	@component
	This container checks if the manifest and all needed definitions already exist in the browsers storage.
-->
<script lang="ts">
	import { getDestinyManifest } from 'bungie-api-ts/destiny2';
	import manifestStore from '$lib/stores/manifest';
	import { DefinitionList } from '$lib/api/utils/types';
	import type { IManifestDefinitions } from '$lib/api/utils/types';
	import { createFetch, getDeletedTablesAsync, isCurrentVersion } from '$lib/api/utils';
	import { useQuery } from '@sveltestack/svelte-query';
	import { browser } from '$app/env';

	const manifestResult = useQuery<IManifestDefinitions>(
		'manifest',
		async () => {
			const destinyManifest = await getDestinyManifest(createFetch());
			const manifestJson = destinyManifest.Response.jsonWorldContentPaths.en;
			// Update all tables if not running with the current version.
			// Otherwise check for missing tables and update only if necessary.
			const updateAll = !(await isCurrentVersion(manifestJson));
			const deletedTables = await getDeletedTablesAsync();

			const response = await fetch('app/manifest', {
				method: 'POST',
				body: JSON.stringify({ updateAll, deletedTables })
			});
			return await response.json();
		},
		{
			enabled: false,
			cacheTime: Infinity,
			staleTime: Infinity,
			refetchOnWindowFocus: false,
			refetchInterval: false,
			refetchOnReconnect: false,
			onSuccess: (data) => {
				console.log('success', data);
				for (const key in data) {
					const element = data[key];
					if (element) {
						manifestStore.addDefinition(DefinitionList[key], element);
					}
				}
			}
		}
	);
	$: manifestResult.setEnabled(browser);
</script>

<slot />
