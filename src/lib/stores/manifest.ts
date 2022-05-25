import { writable } from 'svelte/store';
import { checkStore, manifestStore } from '$lib/api/utils';
import { DefinitionList } from '$lib/api/utils/types';
import type { IManifestDefinitions } from '$lib/api/utils/types';

const createStore = () => {
	const store = writable<IManifestDefinitions>();

	const addDefinitionAsync = async <T>(key: string, definition: T) => {
		await manifestStore?.setItem(key, definition);
		store.update((definitions) => {
			return { ...definitions, [key]: definition };
		});
	};

	const addFromDBAsync = async (key: string) => {
		const definition = await manifestStore?.getItem(key);
		if (definition) {
			store.update((definitions) => {
				return { ...definitions, [key]: definition };
			});
		}
	};

	/**
	 * Checks if a definition table exists in the db.
	 * @param definition The definition name to search for.
	 * @returns true if the table doesn't exist; otherwise false.
	 */
	const isTableDeletedAsync = async (definition: string) => {
		const item = await manifestStore?.getItem(definition);
		return item === null;
	};

	/**
	 * Checks if the stored and manifests aggregate json endpoint are the same.
	 * If false updates the db.
	 * @param manifestJson The manifests endpoint.
	 * @returns true if stored and manifest are the same; otherwise false.
	 */
	const isCurrentVersion = async (manifestJson: string) => {
		const storedJson = await checkStore?.getItem('ver');
		if (storedJson !== manifestJson) {
			//update stored version
			checkStore?.setItem('ver', manifestJson);
			return false;
		}
		return true;
	};

	/**
	 * Checks if all definitions exist in the db.
	 * @returns A list of all missing definitions
	 */
	const getMissingTablesAsync = async () => {
		const definitions: string[] = [];
		for (const key of DefinitionList) {
			if (await isTableDeletedAsync(key)) {
				definitions.push(key);
			}
		}
		return definitions;
	};

	return {
		subscribe: store.subscribe,
		set: store.set,
		addDefinitionAsync,
		addFromDBAsync,
		getMissingTablesAsync,
		isTableDeletedAsync,
		isCurrentVersion
	};
};

export default createStore();