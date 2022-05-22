import { getDestinyManifest } from 'bungie-api-ts/destiny2';
import { createFetch } from './sharedFetch';
import type { ILogger } from './logger';
import { checkStore, manifestStore } from './staticStorage';
import { bngBaseUrl } from './types';
import type { IDefinitions, IManifestDefinitions } from './types';
import { loadingStore } from './loadingStore';

export const componentList = [
	'DestinyVendorDefinition',
	'DestinyVendorGroupDefinition',
	'DestinyActivityDefinition',
	'DestinyDestinationDefinition',
	'DestinyObjectiveDefinition',
	'DestinyClassDefinition',
	'DestinyInventoryItemDefinition',
	'DestinyInventoryBucketDefinition',
	'DestinyProgressionDefinition'
];

/**
 * Checks for the stored manifest versions and if necessary updates them.
 * Returns the stored or fetched defintions.
 */
export const initializeManifest = async (logger?: ILogger) => {
	const destinyManifest = await getDestinyManifest(createFetch());
	const manifestJson = destinyManifest.Response.jsonWorldContentPaths.en;
	// Update all tables if not running with the current version.
	// Otherwise check for missing tables and update only if necessary.
	const updateAll = !(await isCurrentVersion(manifestJson));
	const manifestJsonComponents = destinyManifest.Response.jsonWorldComponentContentPaths.en;

	let definitions: IDefinitions = {};

	loadingStore.update((l) => ({ ...l, text: 'loading missing definitions' }));

	for (const component of componentList) {
		if ((await isTableDeletedAsync(component)) || updateAll) {
			logger?.debug(`fetching ${component} from bungie api`);
			const endPoint = manifestJsonComponents[component];
			const response = await fetch(bngBaseUrl + endPoint);
			const data = await response.json();
			manifestStore?.setItem(component, data);
			definitions[component] = data;
		} else {
			logger?.debug(`getting ${component} from indexedDB`);
			definitions[component] = await manifestStore?.getItem(component);
		}
	}

	return definitions as IManifestDefinitions;
};

/**
 * Checks if the stored and manifests aggregate json endpoint are the same.
 * If false updates the db.
 * @param manifestJson The manifests endpoint.
 * @returns true if stored and manifest are the same; otherwise false.
 */
export const isCurrentVersion = async (manifestJson: string) => {
	const storedJson = await checkStore?.getItem('ver');
	if (storedJson !== manifestJson) {
		//update stored version
		checkStore?.setItem('ver', manifestJson);
		return false;
	}
	return true;
};

/**
 * Checks if a component table exists in the db.
 * @param component The component name to search for.
 * @returns true if the table doesn't exist; otherwise false.
 */
export const isTableDeletedAsync = async (component: string) => {
	const item = await manifestStore?.getItem(component);
	return item === null;
};
