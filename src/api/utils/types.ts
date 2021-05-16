import type { Writable } from "svelte/store";
import type {
    AllDestinyManifestComponents,
    DestinyInventoryComponent,
    DestinyProfileUserInfoCard,
} from "bungie-api-ts/destiny2";
import type { IDestinyCharacterComponentOverride } from "api/destiny2/profile";

export interface ICharacterContext {
    getProfile: () => DestinyProfileUserInfoCard;
    getInventories: () => {
        [key: number]: DestinyInventoryComponent;
    };
    getCharacters: () => IDestinyCharacterComponentOverride[];
    selectedCharacterStore: Writable<IDestinyCharacterComponentOverride>;
}

export interface IManifestDefinitions {
    vendorDefinition: AllDestinyManifestComponents["DestinyVendorDefinition"];
    vendorGroupDefintion: AllDestinyManifestComponents["DestinyVendorGroupDefinition"];
    objectiveDefinition: AllDestinyManifestComponents["DestinyObjectiveDefinition"];
    classDefinition: AllDestinyManifestComponents["DestinyClassDefinition"];
    inventoriyItemDefinition: AllDestinyManifestComponents["DestinyInventoryItemDefinition"];
    progressionDefinition: AllDestinyManifestComponents["DestinyProgressionDefinition"];
}
export interface IManifestContext {
    manifestDefintions: Writable<IManifestDefinitions>;
}

export const bngBaseUrl = "https://www.bungie.net";
