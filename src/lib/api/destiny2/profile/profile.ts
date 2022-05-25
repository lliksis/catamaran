import { DestinyItemType } from 'bungie-api-ts/destiny2';
import type {
	DestinyCharacterComponent,
	DictionaryComponentResponse,
	AllDestinyManifestComponents,
	DestinyInventoryComponent,
	DestinyItemObjectivesComponent
} from 'bungie-api-ts/destiny2';
import { writable } from 'svelte/store';
import type { IDestinyCharacterComponentOverride } from './profile.types';
import { bngBaseUrl } from '$lib/api/utils/types';
import type { IBounty, IBountyObjective } from '../vendor';

/**
 * Converts the characters from getProfile into IDestinyCharacterComponentOverride[].
 * @param characters The characterResponse from getProfile.
 * @param classDefinition The manifests DestinyClassDefinition.
 * @returns characters passed as IDestinyCharacterComponentOverride.
 */
export const resolveCharacters = (
	characters: DictionaryComponentResponse<DestinyCharacterComponent>,
	classDefinition: AllDestinyManifestComponents['DestinyClassDefinition']
): IDestinyCharacterComponentOverride[] => {
	const resolvedCharacters = [];
	for (const characterId in characters.data) {
		const element = characters.data[characterId];
		const className = classDefinition[element.classHash].displayProperties.name;
		resolvedCharacters.push({
			...element,
			class: className,
			emblemPath: bngBaseUrl + element.emblemPath,
			emblemBackgroundPath: bngBaseUrl + element.emblemBackgroundPath
		});
	}
	return resolvedCharacters;
};

export const resolveInventory = (
	inventoryItems: DictionaryComponentResponse<DestinyInventoryComponent>,
	itemObjectiveProgress: DictionaryComponentResponse<DestinyItemObjectivesComponent>,
	inventoryItemDefinition: AllDestinyManifestComponents['DestinyInventoryItemDefinition'],
	objectiveDefinition: AllDestinyManifestComponents['DestinyObjectiveDefinition']
) => {
	const resolvedItems: DictionaryComponentResponse<IBounty[]> = {
		privacy: inventoryItems.privacy,
		data: {}
	};

	for (const characterId in inventoryItems.data) {
		resolvedItems.data[characterId] = [];
		const items = inventoryItems.data[characterId].items;
		items.map((i) => {
			const item = inventoryItemDefinition[i.itemHash];
			if (item.itemType === DestinyItemType.Bounty) {
				const instancedObjectives = itemObjectiveProgress.data[i.itemInstanceId].objectives;
				const bountyObjectives: IBountyObjective[] = item.objectives.objectiveHashes.map(
					(objectiveHash) => {
						const objective = instancedObjectives.find((o) => o.objectiveHash === objectiveHash);
						return {
							progress: objective.progress,
							completionValue: objective.completionValue,
							objectiveProgressDescription: objectiveDefinition[objectiveHash].progressDescription
						};
					}
				);
				resolvedItems.data[characterId].push({
					...item,
					displayProperties: {
						...item.displayProperties,
						icon: bngBaseUrl + item.displayProperties.icon
					},
					objectiveProgress: bountyObjectives
				});
			}
		});
	}

	return resolvedItems.data;
};

/**
 * The store to set/get the current selected character.
 */
export const selectedCharacter = writable<IDestinyCharacterComponentOverride>(undefined);

export const inventorieStores = writable<{
	[key: string]: IBounty[];
}>(undefined);
