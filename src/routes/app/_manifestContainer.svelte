<!--
	@component
	This container checks if the manifest and all needed definitions already exist in the browsers storage.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getDestinyManifest } from 'bungie-api-ts/destiny2';
	import manifestStore from '$lib/stores/manifest';
	import { DefinitionList } from '$lib/api/utils/types';
	import type { IManifestDefinitions } from '$lib/api/utils/types';
	import { createFetch, getDeletedTablesAsync, isCurrentVersion } from '$lib/api/utils';

	onMount(async () => {
		const destinyManifest = await getDestinyManifest(createFetch());
		const manifestJson = destinyManifest.Response.jsonWorldContentPaths.en;
		// Update all tables if not running with the current version.
		// Otherwise check for missing tables and update only if necessary.
		const updateAll = !(await isCurrentVersion(manifestJson));
		const deletedTables = await getDeletedTablesAsync();

		const manifestResponse = await fetch('app/manifest', {
			method: 'POST',
			body: JSON.stringify({ updateAll, deletedTables })
		});
		const definitions: IManifestDefinitions = await manifestResponse.json();

		for (const key in definitions) {
			const element = definitions[key];
			if (element) {
				manifestStore.addDefinition(DefinitionList[key], element);
			}
		}
	});

	$: console.log($manifestStore);
</script>

<slot />
