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
export interface IBounty
    extends Pick<DestinyInventoryItemDefinition, "displayProperties" | "hash"> {
    objectiveProgress: IBountyObjective[];
    tags?: string[];
}
export interface IBountyObjective {
    completionValue: number;
    objectiveProgressDescription: string;
}
export interface IBountyWithPriority extends IBounty {
    priority: number;
}
