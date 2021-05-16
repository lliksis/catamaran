import * as localForage from "localforage";

export const authStorage = localForage.createInstance({
    driver: localForage.LOCALSTORAGE,
    name: "auth",
});

const manifestStorageConfig = {
    driver: localForage.INDEXEDDB,
    name: "manifest",
    version: 1,
};
export const checkStore = localForage.createInstance({
    ...manifestStorageConfig,
    storeName: "version_check",
});
export const manifestStore = localForage.createInstance({
    ...manifestStorageConfig,
    storeName: "component_definitions",
});
