<script lang="ts">
    import { getContext } from "svelte";
    import { push } from "svelte-spa-router";
    import type { DestinyProfileUserInfoCard } from "bungie-api-ts/destiny2";
    import type { IDestinyCharacterComponentOverride } from "api/destiny2/profile";
    import Emblem from "../character/Emblem.svelte";

    const { selectedCharacterStore, getProfile, getCharacters } = getContext(
        "characters"
    );

    let profile: DestinyProfileUserInfoCard = getProfile();
    let characters: IDestinyCharacterComponentOverride[] = getCharacters();

    const onClickCharacter = (
        character: IDestinyCharacterComponentOverride
    ) => {
        selectedCharacterStore.update(() => character);
        push(
            `/${profile.membershipId}/${profile.membershipType}/${character.characterId}`
        );
    };
</script>

<div>
    <div style="border: 1px solid black">
        <img src={profile.iconPath} alt="bnet profile img" />
        {profile.displayName}
        {profile.membershipId}
    </div>
    {#each characters as char}
        <Emblem character={char} onClick={onClickCharacter} />
    {/each}
</div>
