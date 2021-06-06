import {
    BungieMembershipType,
    DestinyCharacterComponent,
    DestinyComponentType,
    DestinyProfileUserInfoCard,
    getLinkedProfiles,
    getProfile,
    DictionaryComponentResponse,
    AllDestinyManifestComponents,
    DestinyInventoryComponent,
    DestinyItemType,
    DestinyItemObjectivesComponent,
} from "bungie-api-ts/destiny2";
import { authStorage, createFetch } from "api/utils";
import type { IAuthToken } from "api/utils/login";
import { writable } from "svelte/store";
import type { IDestinyCharacterComponentOverride } from "./profile.types";
import { bngBaseUrl } from "api/utils/types";
import type { IBounty, IBountyObjective } from "../vendor";

/**
 * Fetches the BNet profile information.
 * @returns The profile as IBnetProfile.
 */
export const fetchProfile = async (): Promise<DestinyProfileUserInfoCard> => {
    const membershipId = (await authStorage.getItem<IAuthToken>("token"))
        .bungieMembershipId;
    const response = await getLinkedProfiles(createFetch(), {
        membershipType: BungieMembershipType.BungieNext,
        membershipId,
        getAllMemberships: false,
    });

    const profile = {
        ...response.Response.profiles[0], // With getAllMemberships=false only one profile is returned
        iconPath: bngBaseUrl + response.Response.bnetMembership.iconPath,
    };

    return profile;
};

/**
 * Fetches the character information.
 * @param destinyMembershipId The membershipId fetched from the linkedProfile endpoint.
 * @param membershipType The membershipType fetched from the linkedProfile endpoint.
 * @returns The response of the getProfile endpoint.
 */
export const fetchResolvedCharacters = async (
    destinyMembershipId: string,
    membershipType: BungieMembershipType,
    classDefinition: AllDestinyManifestComponents["DestinyClassDefinition"],
    inventoryItemDefinition: AllDestinyManifestComponents["DestinyInventoryItemDefinition"],
    objectiveDefinition: AllDestinyManifestComponents["DestinyObjectiveDefinition"]
) => {
    const response = await getProfile(createFetch(true), {
        destinyMembershipId,
        membershipType,
        components: [
            DestinyComponentType.Characters,
            DestinyComponentType.CharacterInventories,
            DestinyComponentType.CharacterProgressions,
            DestinyComponentType.ItemObjectives,
        ],
    });

    const characters = await resolveCharacters(
        response.Response.characters,
        classDefinition
    );
    const inventoryItems = response.Response.characterInventories;
    const itemObjectives = response.Response.itemComponents.objectives;

    const progressions = response.Response.characterProgressions.data;

    return {
        characters,
        inventoryItems: resolveInventory(
            inventoryItems,
            itemObjectives,
            inventoryItemDefinition,
            objectiveDefinition
        ),
        progressions,
    };
};

/**
 * Converts the characters from getProfile into IDestinyCharacterComponentOverride[].
 * @param characters The characterResponse from getProfile.
 * @param classDefinition The manifests DestinyClassDefinition.
 * @returns characters passed as IDestinyCharacterComponentOverride.
 */
const resolveCharacters = async (
    characters: DictionaryComponentResponse<DestinyCharacterComponent>,
    classDefinition: AllDestinyManifestComponents["DestinyClassDefinition"]
): Promise<IDestinyCharacterComponentOverride[]> => {
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

const resolveInventory = (
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
        items.map((i) => {
            const item = inventoryItemDefinition[i.itemHash];
            if (item.itemType === DestinyItemType.Bounty) {
                const instancedObjectives =
                    itemObjectiveProgress.data[i.itemInstanceId].objectives;
                const bountyObjectives: IBountyObjective[] = item.objectives.objectiveHashes.map(
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
                resolvedItems.data[characterId].push({
                    ...item,
                    displayProperties: {
                        ...item.displayProperties,
                        icon: bngBaseUrl + item.displayProperties.icon,
                    },
                    objectiveProgress: bountyObjectives,
                });
            }
        });
    }

    return resolvedItems.data;
};

/**
 * The store to set/get the current selected character.
 */
export const selectedCharacter = writable<IDestinyCharacterComponentOverride>(
    undefined
);
