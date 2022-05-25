import type { RequestHandler } from '@sveltejs/kit';
import { createFetch } from '$lib/api/utils';
import { getDestinyManifest } from 'bungie-api-ts/destiny2';
import { bngBaseUrl, DefinitionList } from '$lib/api/utils/types';

export const post: RequestHandler = async ({ request }) => {
	const { updateAll, missingTables } = await request.json();

	const destinyManifest = await getDestinyManifest(createFetch());
	const manifestJsonComponents = destinyManifest.Response.jsonWorldComponentContentPaths.en;
	const definitions = await Promise.all(
		DefinitionList.map((comp) => {
			if (updateAll || missingTables.includes(comp)) {
				return fetch(bngBaseUrl + manifestJsonComponents[comp]).then((res) => res.json());
			}
			return new Promise((resolve) => resolve(null));
		})
	);

	return {
		body: JSON.stringify(definitions)
	};
};
