<style>
    .vendor {
        display: grid;
        column-gap: 20px;
        grid-template-columns: 100px 300px 50%;
        grid-template-areas: "icon description bounties";
        column-gap: 40px;
        padding: 20px 10px 20px 10px;
        min-height: 150px;
        color: #333;
        background: linear-gradient(
            to right,
            var(--backgroundColor),
            transparent
        );
    }

    .icon {
        grid-area: icon;
        align-self: center;
    }

    .bounties {
        display: grid;
        grid-area: bounties;
        align-self: center;
        grid-template-columns: 75px 75px 75px 75px 75px 75px;
        row-gap: 7px;
    }

    .description {
        grid-area: description;
        align-self: center;
    }

    h3 {
        margin: 0;
    }

    @media only screen and (max-width: 1590px) {
        .vendor {
            grid-template-columns: 100px 440px;
            grid-template-rows: auto auto;
            grid-template-areas:
                "icon description"
                "icon bounties";
            row-gap: 20px;
        }

        .bounties {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
    }

    @media only screen and (max-width: 1025px) {
        .vendor {
            grid-template-columns: 100px 300px;
        }
    }

    @media only screen and (max-width: 835px) {
        .vendor {
            grid-template-areas:
                "description"
                "bounties";
            grid-template-columns: auto;
        }

        .icon {
            display: none;
        }
    }
</style>

<script lang="ts">
    import { getContext } from "svelte";
    import type { BungieMembershipType } from "bungie-api-ts/destiny2";
    import type { IBountyStore } from "api/utils";
    import * as vendorConf from "../../vendorConf.json";
    import type { IBounty, IVendor } from "api/destiny2";
    import Bounty from "./Bounty.svelte";
    import Icon from "./Icon.svelte";
    import type { ICharacterContext } from "api/utils/types";

    export let vendor: IVendor;
    export let params: {
        membershipId: string;
        membershipType: BungieMembershipType;
        characterId: string;
    };

    const { inventories } = getContext<ICharacterContext>("characters");
    const items: IBounty[] = $inventories[params.characterId];

    const { addBounty, store } = getContext<IBountyStore>("bounty");

    const ignore = vendorConf.ignore.includes(vendor.vendorHash);
    const backgroundColor =
        vendorConf.vendorBackgrounds[vendor.vendorHash] || "grey";
    const hasIcon = !vendorConf.vendorWithoutIcon.includes(vendor.vendorHash);
    const areIconsFlipped = vendorConf.iconsFlipped.includes(vendor.vendorHash);
    const hasNoProgressIcon = vendorConf.noProgressIcon.includes(
        vendor.vendorHash
    );

    let vendorIcon = areIconsFlipped ? vendor.progression?.icon : vendor.icon;
    let progressIcon = hasNoProgressIcon
        ? undefined
        : areIconsFlipped
        ? vendor.icon
        : vendor.progression?.icon;

    const createActions = (bounty: IBounty) => [
        {
            text: "Track Bounty",
            action: () => addBounty(bounty),
        },
    ];

    $: isDisabled = (bounty: IBounty) => {
        return (
            $store.some((b) => b.hash === bounty.hash) ||
            items.some((b) => b.hash === bounty.hash)
        );
    };
</script>

{#if !ignore}
    <div class="vendor" style="--backgroundColor: {backgroundColor}">
        <div class="icon">
            {#if hasIcon}
                <Icon
                    {vendorIcon}
                    {progressIcon}
                    progression={vendor.progression}
                />
            {/if}
        </div>

        <div class="description">
            <h3>
                {vendor.name}
            </h3>
            <div>
                {vendor.description}
            </div>
        </div>

        <div class="bounties">
            {#each vendor.bounties as bounty}
                <Bounty
                    {bounty}
                    actions={createActions(bounty)}
                    disabled={isDisabled(bounty)}
                />
            {/each}
        </div>
    </div>
{/if}
