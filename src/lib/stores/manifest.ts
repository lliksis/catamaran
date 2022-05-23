import { writable } from 'svelte/store';
import { manifestStore } from '$lib/api/utils';
import type { IManifestDefinitions } from '$lib/api/utils/types';

const createStore = async () => {
	let definitions: IManifestDefinitions = {};
	await manifestStore?.iterate((value, key) => {
		definitions[key] = value;
	});

	const store = writable<IManifestDefinitions>(definitions);

	const addDefinition = <T>(key: string, definition: T) => {
		manifestStore?.setItem(key, definition);
		store.update((definitions) => {
			return { ...definitions, [key]: definition };
		});
	};

	return {
		subscribe: store.subscribe,
		set: store.set,
		addDefinition
	};
};

export default await createStore();
