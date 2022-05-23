<!--
	@component
	This container checks if the manifest and all needed definitions already exist in the browsers storage.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { DefinitionList } from '$lib/api/utils/types';
	import type { IManifestDefinitions } from '$lib/api/utils/types';
	import {
		createFetch,
		getDeletedTablesAsync,
		isCurrentVersion,
		manifestStore
	} from '$lib/api/utils';
	import { getDestinyManifest } from 'bungie-api-ts/destiny2';

	onMount(async () => {
		const destinyManifest = await getDestinyManifest(createFetch());
		const manifestJson = destinyManifest.Response.jsonWorldContentPaths.en;
		// Update all tables if not running with the current version.
		// Otherwise check for missing tables and update only if necessary.
		const updateAll = !(await isCurrentVersion(manifestJson));
		const deletedTables = await getDeletedTablesAsync();

		const manifestResponse = await fetch('manifest', {
			method: 'POST',
			body: JSON.stringify({ updateAll, deletedTables })
		});
		const definitions: IManifestDefinitions = await manifestResponse.json();
		console.log(definitions);

		for (const key in definitions) {
			const element = definitions[key];
			if (element) {
				manifestStore?.setItem(DefinitionList[key], element);
			}
		}
	});
</script>
