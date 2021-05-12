import {
    BungieMembershipType,
    DestinyComponentType,
    getLinkedProfiles,
    getProfile,
} from "bungie-api-ts/destiny2";
import { getDestinyClassDefinition } from "api/utils/manifest_stores";
import { authStorage, createFetch } from "api/utils";
import type { IAuthToken, IBnetProfile, ICharacter } from "api/utils/types";

/**
 * Fetches profile and character information
 * @returns The profile and characters as IBnetProfile
 */
export const fetchProfile = async () => {
    const membershipId = (await authStorage.getItem<IAuthToken>("token"))
        .bungieMembershipId;
    const response = await getLinkedProfiles(createFetch(), {
        membershipType: BungieMembershipType.BungieNext,
        membershipId,
        getAllMemberships: false,
    });
    const activeDestiny2Profile = response.Response.profiles.find(
        (p) => p.isCrossSavePrimary === true
    );
    const profile: IBnetProfile = {
        displayName: response.Response.bnetMembership.displayName,
        iconPath: `https://bungie.net${response.Response.bnetMembership.iconPath}`,
        membershipId: activeDestiny2Profile.membershipId,
        memberShipType: activeDestiny2Profile.membershipType,
        destiny2_chars: [],
    };

    const charactersResponse = await fetchCharacters(
        profile.membershipId,
        profile.memberShipType
    );
    for (const characterId in charactersResponse.characters.data) {
        const characterData = charactersResponse.characters.data[characterId];
        const characterClass = (await getDestinyClassDefinition())[
            characterData.classHash
        ];
        const character: ICharacter = {
            characterId,
            lightLevel: characterData.light,
            class: characterClass.displayProperties.name,
            emblem: {
                emblemBackground: `https://www.bungie.net${characterData.emblemBackgroundPath}`,
                emblemColor: characterData.emblemColor,
                emblemPath: `https://www.bungie.net${characterData.emblemPath}`,
            },
        };
        profile.destiny2_chars.push(character);
    }

    return profile;
};

/**
 * Fetches the character information.
 * @param destinyMembershipId The membershipId fetched from the linkedProfile endpoint.
 * @param membershipType The membershipType fetched from the linkedProfile endpoint.
 * @returns The response of the getProfile endpoint.
 */
const fetchCharacters = async (
    destinyMembershipId: string,
    membershipType: BungieMembershipType
) => {
    const response = await getProfile(createFetch(), {
        destinyMembershipId,
        membershipType,
        components: [
            DestinyComponentType.Characters,
            DestinyComponentType.CharacterInventories,
            DestinyComponentType.CharacterProgressions,
        ],
    });

    return response.Response;
};
