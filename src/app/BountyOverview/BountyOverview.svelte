<style>
    .overview_container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .overview {
        position: fixed;
        box-sizing: border-box;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.2);
        height: 100%;
        width: 645px;
        padding: 10px;
        padding-top: 15px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
    }

    .bounties {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        min-height: 69px;
    }

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"] ~ label {
        display: none;
        position: sticky;
        width: 20px;
        top: 0;
        left: 100%;
        padding: 2px;
        padding-left: 7px;
        padding-bottom: 5px;
        z-index: 20;
        font-size: large;
        font-weight: bolder;
    }

    input[type="checkbox"] ~ label::before {
        content: "<";
    }

    input[type="checkbox"] ~ label:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    input[type="checkbox"]:checked ~ .overview {
        display: block;
    }

    input[type="checkbox"]:checked ~ label {
        left: 0;
        color: rgb(170, 170, 170);
    }

    input[type="checkbox"]:checked ~ label::before {
        content: ">";
    }

    @media only screen and (max-width: 1235px) {
        .overview {
            width: 430px;
        }
    }

    @media only screen and (max-width: 500px) {
        .overview {
            display: none;
            z-index: 10;
            background-color: rgb(30, 30, 30);
            color: rgb(170, 170, 170);
            width: 100%;
        }

        input[type="checkbox"] ~ label {
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

    export let params: {
        membershipId: string;
        membershipType: BungieMembershipType;
        characterId: string;
    };

    const { getInventories } = getContext("characters");
    const inventories = getInventories();
    const items: IBounty[] = inventories[params.characterId];

    const { store, removeBounty } = getContext<IBountyStore>("bounty");
</script>

<div class="overview_container">
    <input id="expandable" type="checkbox" />
    <label for="expandable" />
    <div class="overview">
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
