import type {
    BungieMembershipType,
    DestinyCharacterComponent,
    DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";
import type { IBountyObjective } from "../vendor";

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
