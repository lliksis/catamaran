<script lang="ts">
    import { getContext } from "svelte";
    import { push } from "svelte-spa-router";
    import type { DestinyProfileUserInfoCard } from "bungie-api-ts/destiny2";
    import type { IDestinyCharacterComponentOverride } from "api/destiny2/profile";

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
        <div on:click={() => onClickCharacter(char)}>
            {char.characterId}
            {char.class}
            {char.light}
            <div>
                <img src={char.emblemBackgroundPath} alt="emblem background" />
                <img src={char.emblemPath} alt="emblem" />
                <span
                    style={`color: rgba(${char.emblemColor.red}, ${char.emblemColor.green}, ${char.emblemColor.blue}, ${char.emblemColor.alpha})`}
                >
                    emblem color value
                </span>
            </div>
        </div>
    {/each}
</div>
