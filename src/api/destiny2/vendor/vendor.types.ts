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
    bounties: IVendorBounty[];
}
export interface IVendorProgression extends DestinyProgression {
    unitName: string;
    name: string;
    description: string;
    icon: string;
}
export interface IVendorBounty extends DestinyInventoryItemDefinition {
    completionValue: number;
    objectiveProgressDescription: string;
}
