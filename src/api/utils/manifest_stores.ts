import type { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { manifestStore } from "./staticStorage";

/**
 * Gets the DestinyDestinationDefintion.
 * @returns The stored DestinyDestionationDefinition.
 */
export const getDestinyDestinationDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyDestinationDefinition"]
    >("DestinyDestinationDefinition");

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
 * Gets the DestinyInventoryBucketDefinition.
 * @returns The stored DestinyInventoryBucketDefinition.
 */
export const getDestinyInventoryBucketDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyInventoryBucketDefinition"]
    >("DestinyInventoryBucketDefinition");

/**
 * Gets the DestinyProgressionDefinition.
 * @returns The stored DestinyProgressionDefinition.
 */
export const getDestinyProgressionDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyProgressionDefinition"]
    >("DestinyProgressionDefinition");

/**
 * Gets the DestinyActivityDefinition.
 * @returns The stored DestinyActivityDefinition.
 */
export const getDestinyActivityDefinition = () =>
    manifestStore.getItem<
        AllDestinyManifestComponents["DestinyActivityDefinition"]
    >("DestinyActivityDefinition");
