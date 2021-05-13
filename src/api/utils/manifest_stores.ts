import type {
    DestinyClassDefinition,
    DestinyDestinationDefinition,
    DestinyInventoryItemDefinition,
    DestinyObjectiveDefinition,
    DestinyVendorDefinition,
    DestinyVendorGroupDefinition,
} from "bungie-api-ts/destiny2";
import { manifestStore } from "./staticStorage";

/**
 * Gets the DestinyDestinationDefintion.
 * @returns The stored DestinyDestionationDefinition.
 */
export const getDestinyDestinationDefinition = () =>
    manifestStore.getItem<DestinyDestinationDefinition[]>(
        "DestinyDestinationDefinition"
    );

/**
 * Gets the DestinyVendorDefinition.
 * @returns The stored DestinyVendorDefinition.
 */
export const getDestinyVendorDefinition = () =>
    manifestStore.getItem<DestinyVendorDefinition[]>("DestinyVendorDefinition");

/**
 * Gets the DestinyVendorGroupDefinition.
 * @returns The stored DestinyVendorGroupDefinition.
 */
export const getDestinyVendorGroupDefinition = () =>
    manifestStore.getItem<DestinyVendorGroupDefinition[]>(
        "DestinyVendorGroupDefinition"
    );

/**
 * Gets the DestinyObjectiveDefinition.
 * @returns The stored DestinyObjectiveDefinition.
 */
export const getDestinyObjectiveDefinition = () =>
    manifestStore.getItem<DestinyObjectiveDefinition[]>(
        "DestinyObjectiveDefinition"
    );

/**
 * Gets the DestinyClassDefinition.
 * @returns The stored DestinyClassDefinition.
 */
export const getDestinyClassDefinition = () =>
    manifestStore.getItem<DestinyClassDefinition[]>("DestinyClassDefinition");

/**
 * Gets the DestinyInventoryItemDefinition.
 * @returns The stored DestinyInventoryItemDefinition.
 */
export const getDestinyInventoryItemDefinition = () =>
    manifestStore.getItem<DestinyInventoryItemDefinition[]>(
        "DestinyInventoryItemDefinition"
    );
