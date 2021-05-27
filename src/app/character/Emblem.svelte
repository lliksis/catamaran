<script lang="ts">
    import type { IDestinyCharacterComponentOverride } from "api/destiny2/profile";

    export let character: IDestinyCharacterComponentOverride;
    export let onclick: (character: IDestinyCharacterComponentOverride) => void;
    export let variant: "primary" | "secondary" = "primary";

    const aspectRatio = variant === "primary" ? "79 / 16" : "1 / 1";
    const imgAlt = `character emblem (${character.class}, ${character.characterId})`;

</script>

<div class="emblem-wrapper" on:click={() => onclick(character)} style={`background-image: url(${character.emblemBackgroundPath}); aspect-ratio: ${aspectRatio}`} id={character.characterId}>
    <span class="emblem-light">
        {character.light}
    </span>
    <div class="emblem-character-information">
        <div class="emblem-character-class">
            {character.class}
        </div>
        <div class="emblem-character-race">
            Human
        </div>
    </div>
    
</div>

<style>
    .emblem-wrapper {
        width: 300px;
        background-size: auto 100%;
    }

    .emblem-character-information {
        border: 1px solid black;
        position: relative;
        text-align: center;
    }
    .emblem-character-class{
        color: white;
        font-size: 20px;
        font-weight: 600;
    }
    .emblem-character-race{
        font-size: 17px;
        color: #eee;
    }
    .emblem-light {
        position: relative;
        float: right;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 5px;
        color: #ffff00;
        font-size: 30px;
        font-weight: 600;
    }
</style>
