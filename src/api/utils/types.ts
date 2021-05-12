import type { BungieMembershipType } from "bungie-api-ts/common";

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
    characterId: string;
    class: string;
    lightLevel: number;
    emblem: IEmblem;
}

export interface IEmblem {
    emblemPath: string;
    emblemBackground: string;
    emblemColor: {
        red: number;
        green: number;
        blue: number;
        alpha: number;
    };
}
