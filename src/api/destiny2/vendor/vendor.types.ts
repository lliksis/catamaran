import type {
    DestinyInventoryItemDefinition,
    DestinyProgression,
    DestinyVendorComponent,
} from "bungie-api-ts/destiny2";

export interface IVendor extends DestinyVendorComponent {
    name: string;
    description: string;
    subtitle: string;
    icon: string;
    group: string;
    progression: IVendorProgression;
    bounties: IBounty[];
}
export interface IVendorProgression extends DestinyProgression {
    unitName: string;
    name: string;
    description: string;
    icon: string;
}
export interface IBounty extends DestinyInventoryItemDefinition {
    objectiveProgress: IBountyObjective[];
}
export interface IBountyObjective {
    progress: number;
    completionValue: number;
    objectiveProgressDescription: string;
}
