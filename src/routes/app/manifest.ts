import type { RequestHandler } from '@sveltejs/kit';
import { componentList, createFetch } from '$lib/api/utils';
import { getDestinyManifest } from 'bungie-api-ts/destiny2';
import { bngBaseUrl } from '$lib/api/utils/types';

export const post: RequestHandler = async ({ request }) => {
	const { updateAll, deletedTables } = await request.json();

	const destinyManifest = await getDestinyManifest(createFetch());
	const manifestJsonComponents = destinyManifest.Response.jsonWorldComponentContentPaths.en;
	const definitions = await Promise.all(
		componentList.map((comp) => {
			if (updateAll || deletedTables.includes(comp)) {
				return fetch(bngBaseUrl + manifestJsonComponents[comp]).then((res) => res.json());
			}
			return null;
		})
	);

	return {
		body: JSON.stringify(definitions)
	};
};
