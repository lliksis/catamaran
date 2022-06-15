import {
    DestinyCharacterComponent,
    DictionaryComponentResponse,
    AllDestinyManifestComponents,
    DestinyInventoryComponent,
    DestinyItemType,
    DestinyItemObjectivesComponent,
} from "bungie-api-ts/destiny2";
import { writable } from "svelte/store";
import type { IDestinyCharacterComponentOverride } from "./profile.types";
import { bngBaseUrl } from "api/utils/types";
import type { IBounty, IBountyObjective } from "../vendor";
import bounties from "../bounties";

/**
 * Converts the characters from getProfile into IDestinyCharacterComponentOverride[].
 * @param characters The characterResponse from getProfile.
 * @param classDefinition The manifests DestinyClassDefinition.
 * @returns characters passed as IDestinyCharacterComponentOverride.
 */
export const resolveCharacters = (
    characters: DictionaryComponentResponse<DestinyCharacterComponent>,
    classDefinition: AllDestinyManifestComponents["DestinyClassDefinition"]
): IDestinyCharacterComponentOverride[] => {
    const resolvedCharacters = [];
    for (const characterId in characters.data) {
        const element = characters.data[characterId];
        const className =
            classDefinition[element.classHash].displayProperties.name;
        resolvedCharacters.push({
            ...element,
            class: className,
            emblemPath: bngBaseUrl + element.emblemPath,
            emblemBackgroundPath: bngBaseUrl + element.emblemBackgroundPath,
        });
    }
    return resolvedCharacters;
};

export const resolveInventory = (
    inventoryItems: DictionaryComponentResponse<DestinyInventoryComponent>,
    itemObjectiveProgress: DictionaryComponentResponse<DestinyItemObjectivesComponent>,
    inventoryItemDefinition: AllDestinyManifestComponents["DestinyInventoryItemDefinition"],
    objectiveDefinition: AllDestinyManifestComponents["DestinyObjectiveDefinition"]
) => {
    const resolvedItems: DictionaryComponentResponse<IBounty[]> = {
        privacy: inventoryItems.privacy,
        data: {},
    };

    for (const characterId in inventoryItems.data) {
        resolvedItems.data[characterId] = [];
        const items = inventoryItems.data[characterId].items;
        for (const item of items) {
            let bounty = bounties.findBountyByHash(item.itemHash);
            if (!bounty) {
                const itemDefinition = inventoryItemDefinition[item.itemHash];
                if (itemDefinition.itemType === DestinyItemType.Bounty) {
                    const instancedObjectives =
                        itemObjectiveProgress.data[item.itemInstanceId]
                            .objectives;
                    const bountyObjectives: IBountyObjective[] =
                        itemDefinition.objectives.objectiveHashes.map(
                            (objectiveHash) => {
                                const objective = instancedObjectives.find(
                                    (o) => o.objectiveHash === objectiveHash
                                );
                                return {
                                    progress: objective.progress,
                                    completionValue: objective.completionValue,
                                    objectiveProgressDescription:
                                        objectiveDefinition[objectiveHash]
                                            .progressDescription,
                                };
                            }
                        );
                    bounty = {
                        ...itemDefinition,
                        displayProperties: {
                            ...itemDefinition.displayProperties,
                            icon:
                                bngBaseUrl +
                                itemDefinition.displayProperties.icon,
                        },
                        objectiveProgress: bountyObjectives,
                    };
                    resolvedItems.data[characterId].push(bounty);
                }
            } else {
                resolvedItems.data[characterId].push(bounty);
            }
        }
    }

    return resolvedItems.data;
};

/**
 * The store to set/get the current selected character.
 */
export const selectedCharacter =
    writable<IDestinyCharacterComponentOverride>(undefined);

export const inventorieStores =
    writable<{
        [key: string]: IBounty[];
    }>(undefined);
