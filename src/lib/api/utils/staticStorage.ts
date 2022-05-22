import { browser } from '$app/env';
import * as localForage from 'localforage';

const manifestStorageConfig = {
	driver: localForage.INDEXEDDB,
	name: 'manifest',
	version: 1
};
export const checkStore = browser
	? localForage.createInstance({
			...manifestStorageConfig,
			storeName: 'version_check'
	  })
	: null;
export const manifestStore = browser
	? localForage.createInstance({
			...manifestStorageConfig,
			storeName: 'component_definitions'
	  })
	: null;
