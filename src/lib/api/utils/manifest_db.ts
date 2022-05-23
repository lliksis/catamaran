import { getDestinyManifest } from 'bungie-api-ts/destiny2';
import { createFetch } from './sharedFetch';
import type { ILogger } from './logger';
import { checkStore, manifestStore } from './staticStorage';
import { bngBaseUrl, DefinitionList } from './types';
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
 * Checks if a definition table exists in the db.
 * @param definition The definition name to search for.
 * @returns true if the table doesn't exist; otherwise false.
 */
export const isTableDeletedAsync = async (definition: string) => {
	const item = await manifestStore?.getItem(definition);
	return item === null;
};

/**
 * Checks if all definitions exist in the db.
 * @returns A list of all missing definitions
 */
export const getDeletedTablesAsync = async () => {
	const definitions: string[] = [];
	for (const key of DefinitionList) {
		if (await isTableDeletedAsync(key)) {
			definitions.push(key);
		}
	}
	return definitions;
};
