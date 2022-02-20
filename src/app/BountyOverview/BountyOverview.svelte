<style>
    .overview_container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    .overview {
        position: fixed;
        box-sizing: border-box;
        top: 0;
        right: 0;
        background-color: rgba(44, 42, 53, 0.86);
        color: white;
        height: 100%;
        width: 645px;
        padding: 10px;
        padding-top: 15px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        pointer-events: all;
    }

    .bounties {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        min-height: 69px;
    }

    #expandable {
        display: none;
        position: sticky;
        width: 20px;
        top: 1%;
        left: 100%;
        padding: 2px;
        padding-left: 7px;
        padding-bottom: 5px;
        z-index: 20;
        font-size: large;
        font-weight: bolder;
        pointer-events: auto;
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
        transform: scale(-1, 1);
    }

    #expandable.expanded {
        transform: scale(1);
        left: 0;
    }

    @media only screen and (max-width: 1235px) {
        .overview {
            width: 430px;
        }
    }

    @media only screen and (max-width: 935px) {
        .overview {
            display: none;
            z-index: 10;
            background-color: rgb(30, 30, 30);
            color: rgb(170, 170, 170);
            width: 100%;
        }

        .overview.expanded {
            display: block;
        }

        #expandable {
            display: inline-block;
        }
    }
</style>

<script lang="ts">
    import type { BungieMembershipType } from "bungie-api-ts/destiny2";
    import type { IBountyStore } from "api/utils";
    import Bounty from "../vendor/Bounty.svelte";
    import { getContext } from "svelte";
    import type { IBounty } from "api/destiny2";
    import type { ICharacterContext } from "api/utils/types";

    export let params: {
        membershipId: string;
        membershipType: BungieMembershipType;
        characterId: string;
    };

    const { inventories } = getContext<ICharacterContext>("characters");
    $: console.log($inventories);
    let items: IBounty[] = [];
    $: items = $inventories[params.characterId];

    const { store, removeBounty } = getContext<IBountyStore>("bounty");

    //expanded css classes will onlz be added to the elements on a mobile breakpoint
    let expanded = false;
    const onExpandableClick = () => (expanded = !expanded);
</script>

<div class="overview_container">
    <span id="expandable" class:expanded on:click={onExpandableClick}>
        <svg
            width="20"
            height="25"
            viewBox="0 0 183 213"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path
                    d="M175.365 97.3475C179.266 99.675 179.265 105.325 175.365 107.652L13.8244 204.04C9.82499 206.426 4.75 203.544 4.75 198.887L4.75 6.11282C4.75 1.45561 9.82499 -1.42601 13.8244 0.960318L175.365 97.3475Z"
                    fill="url(#paint0_linear_2_3)"
                />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_2_3"
                    x1="5"
                    y1="102"
                    x2="184"
                    y2="102"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#7DB0FD" />
                    <stop offset="1" stop-color="#FD7D7D" />
                </linearGradient>
            </defs>
        </svg>
    </span>
    <div class="overview" class:expanded>
        <h1>Inventory</h1>
        {#if items.length > 0}
            <div class="bounties">
                {#each items as bounty}
                    <Bounty {bounty} />
                {/each}
            </div>
        {:else}
            <p>There are no bounties in your Inventory</p>
        {/if}
        <hr />
        <h1>Tracked Bounties</h1>
        {#if $store.length > 0}
            <div class="bounties">
                {#each $store as bounty}
                    <Bounty
                        {bounty}
                        actionText={"Hold to remove"}
                        actionCallback={() => removeBounty(bounty)}
                    />
                {/each}
            </div>
        {:else}
            <p>There are currently no bounties tracked</p>
        {/if}
    </div>
</div>
