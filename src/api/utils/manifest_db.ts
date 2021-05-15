import {
    DestinyManifestComponentName,
    getDestinyManifest,
} from "bungie-api-ts/destiny2";
import { createFetch } from "./sharedFetch";
import type { ILogger } from "./logger";
import { checkStore, manifestStore } from "./staticStorage";
import { bngBaseUrl } from "./types";

const componentList: DestinyManifestComponentName[] = [
    "DestinyVendorDefinition",
    "DestinyVendorGroupDefinition",
    "DestinyActivityDefinition",
    "DestinyDestinationDefinition",
    "DestinyObjectiveDefinition",
    "DestinyClassDefinition",
    "DestinyInventoryItemDefinition",
    "DestinyInventoryBucketDefinition",
    "DestinyProgressionDefinition",
];

/**
 * Checks for the stored manifest versions and if necessary updates them
 */
export const checkForManifest = async (logger?: ILogger) => {
    const destinyManifest = await getDestinyManifest(createFetch());
    const manifestJson = destinyManifest.Response.jsonWorldContentPaths.en;
    // Update all tables if not running with the current version.
    // Otherwise check for missing tables and update only if necessary.
    const updateAll = !(await isCurrentVersion(manifestJson));
    const manifestJsonComponents =
        destinyManifest.Response.jsonWorldComponentContentPaths.en;

    componentList.forEach(async (component) => {
        if ((await isTableDeleted(component)) || updateAll) {
            logger?.debug(`fetching ${component}`);
            const endPoint = manifestJsonComponents[component];
            const response = await fetch(bngBaseUrl + endPoint);
            const data = await response.json();
            manifestStore.setItem(component, data);
        }
    });
};

/**
 * Checks if the stored and manifests aggregate json endpoint are the same.
 * If false updates the db.
 * @param manifestJson The manifests endpoint
 * @returns true if stored and manifest are the same; otherwise false
 */
const isCurrentVersion = async (manifestJson: string) => {
    const storedJson = await checkStore.getItem("ver");
    if (storedJson !== manifestJson) {
        //update stored version
        checkStore.setItem("ver", manifestJson);
        return false;
    }
    return true;
};

/**
 * Checks if a component table exists in the db.
 * @param component The component name to search for
 * @returns true if the table doesn't exist; otherwise false
 */
const isTableDeleted = async (component: string) => {
    const item = await manifestStore.getItem(component);
    return item === null;
};
