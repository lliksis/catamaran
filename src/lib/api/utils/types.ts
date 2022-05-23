import type { Writable } from 'svelte/store';
import type { AllDestinyManifestComponents } from 'bungie-api-ts/destiny2';
import type { IDestinyCharacterComponentOverride } from '../destiny2/profile';
import type { IBounty } from '../destiny2';

export interface ICharacterContext {
	inventories: Writable<{
		[key: string]: IBounty[];
	}>;
	getCharacters: () => IDestinyCharacterComponentOverride[];
	selectedCharacterStore: Writable<IDestinyCharacterComponentOverride>;
}

export interface IManifestDefinitions {
	DestinyVendorDefinition: AllDestinyManifestComponents['DestinyVendorDefinition'];
	DestinyVendorGroupDefinition: AllDestinyManifestComponents['DestinyVendorGroupDefinition'];
	DestinyObjectiveDefinition: AllDestinyManifestComponents['DestinyObjectiveDefinition'];
	DestinyClassDefinition: AllDestinyManifestComponents['DestinyClassDefinition'];
	DestinyInventoryItemDefinition: AllDestinyManifestComponents['DestinyInventoryItemDefinition'];
	DestinyProgressionDefinition: AllDestinyManifestComponents['DestinyProgressionDefinition'];
}
export interface IManifestContext {
	getDefinitions: () => IManifestDefinitions;
}

export interface IDefinitions {
	DestinyVendorDefinition?: IManifestDefinitions['DestinyVendorDefinition'];
	DestinyVendorGroupDefinition?: IManifestDefinitions['DestinyVendorGroupDefinition'];
	DestinyObjectiveDefinition?: IManifestDefinitions['DestinyObjectiveDefinition'];
	DestinyClassDefinition?: IManifestDefinitions['DestinyClassDefinition'];
	DestinyInventoryItemDefinition?: IManifestDefinitions['DestinyInventoryItemDefinition'];
	DestinyProgressionDefinition?: IManifestDefinitions['DestinyProgressionDefinition'];
}

export const bngBaseUrl = 'https://www.bungie.net';

export const DefinitionList = [
	'DestinyVendorDefinition',
	'DestinyVendorGroupDefinition',
	'DestinyActivityDefinition',
	'DestinyDestinationDefinition',
	'DestinyObjectiveDefinition',
	'DestinyClassDefinition',
	'DestinyInventoryItemDefinition',
	'DestinyInventoryBucketDefinition',
	'DestinyProgressionDefinition'
];
