import type { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { writable } from "svelte/store";
import { manifestStore } from "./staticStorage";
import type { IManifestDefinitions } from "./types";

/**
 * Gets the DestinyVendorDefinition.
 * @returns The stored DestinyVendorDefinition.
 */
export const getDestinyVendorDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyVendorDefinition"]
    >("DestinyVendorDefinition");

/**
 * Gets the DestinyVendorGroupDefinition.
 * @returns The stored DestinyVendorGroupDefinition.
 */
export const getDestinyVendorGroupDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyVendorGroupDefinition"]
    >("DestinyVendorGroupDefinition");

/**
 * Gets the DestinyObjectiveDefinition.
 * @returns The stored DestinyObjectiveDefinition.
 */
export const getDestinyObjectiveDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyObjectiveDefinition"]
    >("DestinyObjectiveDefinition");

/**
 * Gets the DestinyClassDefinition.
 * @returns The stored DestinyClassDefinition.
 */
export const getDestinyClassDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyClassDefinition"]
    >("DestinyClassDefinition");

/**
 * Gets the DestinyInventoryItemDefinition.
 * @returns The stored DestinyInventoryItemDefinition.
 */
export const getDestinyInventoryItemDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyInventoryItemDefinition"]
    >("DestinyInventoryItemDefinition");

/**
 * Gets the DestinyProgressionDefinition.
 * @returns The stored DestinyProgressionDefinition.
 */
export const getDestinyProgressionDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyProgressionDefinition"]
    >("DestinyProgressionDefinition");

export const DefinitionsStore = writable<IManifestDefinitions>(undefined);

/**
 * Loads the stored defintions into a store to pass it down to children components via context.
 */
export const storeDefintionsInStore = async () => {
    const vendorDefinition = await getDestinyVendorDefinition();
    const vendorGroupDefintion = await getDestinyVendorGroupDefinition();
    const objectiveDefinition = await getDestinyObjectiveDefinition();
    const classDefinition = await getDestinyClassDefinition();
    const inventoriyItemDefinition = await getDestinyInventoryItemDefinition();
    const progressionDefinition = await getDestinyProgressionDefinition();

    DefinitionsStore.update((v) => {
        return {
            classDefinition: classDefinition,
            inventoriyItemDefinition: inventoriyItemDefinition,
            objectiveDefinition: objectiveDefinition,
            progressionDefinition: progressionDefinition,
            vendorDefinition: vendorDefinition,
            vendorGroupDefintion: vendorGroupDefintion,
        };
    });
};
