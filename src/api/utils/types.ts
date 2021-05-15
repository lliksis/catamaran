import type { BungieMembershipType } from "bungie-api-ts/common";
import type {
    DestinyCharacterComponent,
    DestinyInventoryItemDefinition,
    DestinyProgression,
    DestinyVendorComponent,
} from "bungie-api-ts/destiny2";

export interface IAuthToken {
    accessToken: IToken;
    refreshToken: IToken;
    bungieMembershipId: string;
}

export interface IToken {
    token: string;
    expiresOn: number;
}

export interface ILogger {
    debug: (message: string, ...data: any[]) => void;
    warn: (message: string, ...data: any[]) => void;
    error: (message: string, ...data: any[]) => void;
    info: (message: string, ...data: any[]) => void;
}

export interface IBnetProfile {
    displayName: string;
    iconPath: string;
    membershipId: string;
    memberShipType: BungieMembershipType;
    destiny2_chars?: ICharacter[];
}

export interface ICharacter {
    [key: number]: IDestinyCharacterComponentOverride;
}
export interface IDestinyCharacterComponentOverride
    extends DestinyCharacterComponent {
    class: string;
}

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
