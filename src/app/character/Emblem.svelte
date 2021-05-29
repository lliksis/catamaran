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
        cursor: pointer;
        text-shadow: 1px 1px 1px #0000007f;
        transition: box-shadow 0.7s, opacity 0.6s, width 0.5s;
    }
    .emblem-wrapper:hover {
        opacity: 0.8;
        outline: 1;
        box-shadow: 0 0 0 1.5px #fff, 0 0 0 3.5px #e2e2e2;
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
    .emblem-light::before {
        content: "\e921";
        font-weight: 100;
    }
    .emblem-light {
        grid-area: b;
        color: var(--light-color);
        font-size: 30px;
        font-weight: 600;
        line-height: 30px;
    }

</style>

<script lang="ts">
    import type { IDestinyCharacterComponentOverride } from "api/destiny2/profile";
    import { clear } from "localforage";

    export let character: IDestinyCharacterComponentOverride;
    export let variant: "primary" | "secondary" = "primary";

    let hovering = false;
    $: fullSize = variant === "primary" || hovering;

    $: aspectRatio = fullSize
        ? { width: 79, height: 16 }
        : { width: 1, height: 1 };

    const height = 64;
    $: width = (height / aspectRatio.height) * aspectRatio.width;

    let background =
        variant === "primary"
            ? character.emblemBackgroundPath
            : character.emblemPath;

    // Change the emblems background image on hover.
    // To have a "smooth" transition setting the small image is delayed.
    let timeout;
    const onMouseEnter = () => {
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
        hovering = true;
        background = character.emblemBackgroundPath;
    };
    const onMouseLeave = () => {
        hovering = false;
        timeout = setTimeout(() => {
            if (!fullSize) {
                background = character.emblemPath;
            }
        }, 400);
    };

</script>

<a
    class="emblem-wrapper"
    style={`background-image: url(${background}); --emblem-height: ${height}px; --emblem-width: ${width}px`}
    id={character.characterId}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
>
    {#if fullSize}
        <div class="emblem-character-class">
            {character.class}
        </div>
        <div class="emblem-light">
            {character.light}
        </div>
        <div class="emblem-character-race">Human</div>
    {/if}
</a>
