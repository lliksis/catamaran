<script lang="ts">
    import { fade } from "svelte/transition";
    import type { IDestinyCharacterComponentOverride } from "api/destiny2/profile";

    export let index = 0;
    export let character: IDestinyCharacterComponentOverride;
    export let onClick: (character: IDestinyCharacterComponentOverride) => void;

    $: aspectRatio = { width: 79, height: 16 };

    const height = 64;
    $: width = (height / aspectRatio.height) * aspectRatio.width;

    let background = character.emblemBackgroundPath;
</script>

<div
    in:fade={{ delay: index * 350, duration: 500 }}
    class="emblem-wrapper button"
    style={`background-image: url(${background}); --emblem-height: ${height}px; --emblem-width: ${width}px`}
    id={character.characterId}
    on:click={() => onClick(character)}
>
    <div class="emblem-character-class">
        {character.class}
    </div>
    <div class="emblem-light">
        <span class="icon-power_small_right light-icon" />
        {character.light}
    </div>
    <div class="emblem-character-race">Human</div>
</div>

<style>
    :root {
        --light-color: #ffff00;
    }
    .emblem-wrapper {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-areas: "a b";
        grid-column-gap: 50px;
        justify-content: space-around;
        height: var(--emblem-height);
        width: var(--emblem-width);
        background-size: auto 100%;
        text-shadow: 1px 1px 1px #0000007f;
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5));
    }
    .emblem-character-class {
        grid-area: a;
        padding-left: 50px;
        color: white;
        font-size: 20px;
        font-weight: 600;
    }
    .emblem-character-race {
        grid-area: a;
        padding-left: 51px;
        align-self: center;
        font-size: 17px;
        color: #eee;
    }
    .light-icon {
        font-weight: 100;
        margin-right: -5px;
    }
    .emblem-light {
        margin-left: -10px;
        grid-area: b;
        color: var(--light-color);
        font-size: 30px;
        font-weight: 600;
        line-height: 30px;
    }
</style>
