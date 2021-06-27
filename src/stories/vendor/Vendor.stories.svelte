<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import VendorComponent from "../../app/vendor/Vendor.svelte";

</script>

<Meta title="Components/Vendor" component={VendorComponent} />

<Template let:args>
    <VendorComponent vendor={args.vendor} />
</Template>

<Story
    name="Standard"
    args={{
        vendor: {
            icon:
                "https://www.bungie.net/common/destiny2_content/icons/32049558a076b04b18cd26b7b060061c.png",
            name: "Commander Zavala",
            description:
                "The resolute Commander Zavala advises Guardians on all Vanguard-related activities.",
            progression: {
                icon:
                    "https://www.bungie.net/common/destiny2_content/icons/32049558a076b04b18cd26b7b060061c.png",
                name: "Vanguard Tactical",
                level: "56",
                progressToNextLevel: "1000",
                nextLevelAt: "2000",
                description:
                    "Commander Zavala oversees the Vanguard's tactical operations and conducts regular strikes against the City's enemies.",
            },
            bounties: [
                {
                    displayProperties: {
                        hasIcon: true,
                        icon:
                            "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                        name: "Horseshoes and Hand Grenades",
                        description: "Defeat enemies with grenades.",
                    },
                    objectiveProgress: [
                        {
                            progress: 10,
                            completionValue: 20,
                            objectiveProgressDescription: "[Grenade] Grenade",
                        },
                    ],
                },
                {
                    displayProperties: {
                        hasIcon: true,
                        icon:
                            "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                        name: "Horseshoes and Hand Grenades",
                        description: "Defeat enemies with grenades.",
                    },
                    objectiveProgress: [
                        {
                            progress: 5,
                            completionValue: 25,
                            objectiveProgressDescription: "[Grenade] Grenade",
                        },
                    ],
                },
                {
                    displayProperties: {
                        hasIcon: true,
                        icon:
                            "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                        name: "Horseshoes and Hand Grenades",
                        description: "Defeat enemies with grenades.",
                    },
                    objectiveProgress: [
                        {
                            progress: 30,
                            completionValue: 30,
                            objectiveProgressDescription: "[Grenade] Grenade",
                        },
                    ],
                },
            ],
        },
    }}
/>
