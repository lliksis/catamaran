<script lang="ts">
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import { DestinyProgressionRewardItemState } from "bungie-api-ts/destiny2";
    import VendorComponent from "../../app/vendor/Vendor.svelte";
</script>

<Meta title="Components/Vendor" component={VendorComponent} />

<Template let:args>
    <VendorComponent {...args} />
</Template>

<Story
    name="Standard"
    args={{
        vendor: {
            canPurchase: true,
            progression: {
                progressionHash: 457612306,
                dailyProgress: 0,
                dailyLimit: 0,
                weeklyProgress: 0,
                weeklyLimit: 0,
                currentProgress: 1332,
                level: 5,
                levelCap: 16,
                stepIndex: 5,
                progressToNextLevel: 382,
                nextLevelAt: 600,
                name: "Vanguard Rank",
                description:
                    "\"A Guardian's word is only as strong as their reputation. And the Vanguard doesn't forget.\" —Commander Zavala\n\nComplete strikes and Seasonal activities to gain Vanguard Rank Points. Complete them back-to-back to increase your activity streak. Earn more Rank Points with higher streaks for higher difficulty Nightfalls.\n\nBeginning another activity type resets your streak.",
                icon:
                    "https://www.bungie.net/common/destiny2_content/icons/01f764372255768a17c58458a9928766.png",
                unitName: "Vanguard Rank Points",
                seasonResets: [{ season: 17, resets: 17 }],
                rewardItemStates: [DestinyProgressionRewardItemState.None],
            },
            vendorLocationIndex: 0,
            vendorHash: 69482069,
            nextRefreshDate: "2022-04-26T17:00:00Z",
            enabled: true,
            subtitle: "Titan Vanguard",
            description:
                "The resolute Commander Zavala advises Guardians on all Vanguard-related activities.",
            name: "Commander Zavala",
            icon:
                "https://www.bungie.net/common/destiny2_content/icons/a98b34b7a67aa69b511160563d46a96e.png",
            bounties: [
                {
                    displayProperties: {
                        description:
                            "Defeat minibosses and bosses in any strike.",
                        name: "The Harder They Fall",
                        icon:
                            "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                        hasIcon: true,
                        iconSequences: [],
                        highResIcon: "",
                    },
                    hash: 813428809,
                    objectiveProgress: [
                        {
                            progress: 0,
                            completionValue: 10,
                            objectiveProgressDescription:
                                "Challenging combatants",
                        },
                    ],
                },
                {
                    displayProperties: {
                        description:
                            "Defeat minibosses and bosses in any strike.",
                        name: "The Harder They Fall",
                        icon:
                            "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                        hasIcon: true,
                        iconSequences: [],
                        highResIcon: "",
                    },
                    hash: 813428809,
                    objectiveProgress: [
                        {
                            progress: 0,
                            completionValue: 10,
                            objectiveProgressDescription:
                                "Challenging combatants",
                        },
                    ],
                },
                {
                    displayProperties: {
                        description:
                            "Defeat minibosses and bosses in any strike.",
                        name: "The Harder They Fall",
                        icon:
                            "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                        hasIcon: true,
                        iconSequences: [],
                        highResIcon: "",
                    },
                    hash: 813428809,
                    objectiveProgress: [
                        {
                            progress: 0,
                            completionValue: 10,
                            objectiveProgressDescription:
                                "Challenging combatants",
                        },
                    ],
                },
                {
                    displayProperties: {
                        description:
                            "Defeat minibosses and bosses in any strike.",
                        name: "The Harder They Fall",
                        icon:
                            "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                        hasIcon: true,
                        iconSequences: [],
                        highResIcon: "",
                    },
                    hash: 813428809,
                    objectiveProgress: [
                        {
                            progress: 0,
                            completionValue: 10,
                            objectiveProgressDescription:
                                "Challenging combatants",
                        },
                    ],
                },
            ],
            group: "Tower",
        },
    }}
/>
