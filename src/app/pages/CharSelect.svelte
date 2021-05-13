<script lang="ts">
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { fetchProfile } from "api/destiny2";
    import type { IBnetProfile } from "api/utils/types";

    let loading = true;
    let profile: IBnetProfile;

    const onClickCharacter = (characterId: string) => {
        push(`/${profile.membershipId}/${characterId}`);
    };

    onMount(async () => {
        profile = await fetchProfile();
        loading = false;
    });
</script>

<div>
    {#if loading}
        loading...
    {:else}
        <div style="border: 1px solid black">
            <img src={profile.iconPath} alt="bnet profile img" />
            {profile.displayName}
            {profile.membershipId}
        </div>
        {#each profile.destiny2_chars as char}
            <div on:click={() => onClickCharacter(char.characterId)}>
                {char.characterId}
                {char.class}
                {char.lightLevel}
                <div>
                    <img
                        src={char.emblem.emblemBackground}
                        alt="emblem background"
                    />
                    <img src={char.emblem.emblemPath} alt="emblem" />
                    <span
                        style={`color: rgba(${char.emblem.emblemColor.red}, ${char.emblem.emblemColor.green}, ${char.emblem.emblemColor.blue}, ${char.emblem.emblemColor.alpha})`}
                    >
                        emblem color value
                    </span>
                </div>
            </div>
        {/each}
    {/if}
</div>
