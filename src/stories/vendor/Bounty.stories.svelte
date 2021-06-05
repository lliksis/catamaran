<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import BountyComponent from "../../app/vendor/Bounty.svelte";

</script>

<Meta title="Components/Vendor/Bounty" component={BountyComponent} />

<Template let:args>
    <BountyComponent bounty={{ ...args }} />
</Template>

<Story
    name="Standard"
    args={{
        displayProperties: {
            hasIcon: true,
            icon:
                "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
            name: "Horseshoes and Hand Grenades",
            description: "Defeat enemies with grenades.",
        },
        objectiveProgress: [
            {
                completionValue: 20,
                objectiveProgressDescription: "[Grenade] Grenade",
            },
        ],
    }}
/>
