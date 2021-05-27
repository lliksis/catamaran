<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import CharacterEmblem from "../app/character/Emblem.svelte";

</script>

<Meta
    title="Components/Emblem"
    component={CharacterEmblem}
    argType={{
        character: {
            characterId: { control: "number" },
            class: {
                control: {
                    type: "select",
                    options: ["Hunter", "Warlock", "Titan"],
                },
            },
            light: { control: "number" },
            emblemPath: { control: "text" },
            emblemBackgroundPath: { control: "text" },
        },
        variant: {
            control: {
                type: "inline-radio",
                options: ["primary", "secondary"],
            },
        },
    }}
/>

<Template let:args>
    <CharacterEmblem
        character={{
            ...args.character,
        }}
        variant={args.variant}
    />
</Template>

<Story
    name="Primary"
    args={{
        character: {
            characterId: 1234,
            light: 1320,
            class: "Hunter",
            emblemBackgroundPath:
                "https://www.bungie.net/common/destiny2_content/icons/c9045e341668eb434b68cd8d02e3ab21.jpg",
        },
        variant: "primary",
    }}
/>

<Story
    name="Secondary"
    args={{
        character: {
            characterId: 1234,
            light: 1320,
            class: "Hunter",
            emblemPath:
                "https://www.bungie.net/common/destiny2_content/icons/4277426f6ffdb0cf85075c7251268374.jpg",
        },
        variant: "secondary",
    }}
/>
