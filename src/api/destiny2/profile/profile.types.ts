import type {
    BungieMembershipType,
    DestinyCharacterComponent,
} from "bungie-api-ts/destiny2";

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
