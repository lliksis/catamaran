<style>
    .overview {
        position: fixed;
        box-sizing: border-box;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.2);
        height: 100%;
        width: 35%;
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
</style>

<script lang="ts">
    import type { IBountyStore } from "api/utils";
    import Bounty from "../vendor/Bounty.svelte";
    import { getContext } from "svelte";
    import type { IBounty } from "api/destiny2";

    export let params;

    const { getInventories } = getContext("characters");
    const inventories = getInventories();
    const items: IBounty[] = inventories[params.characterId];

    const { store, removeBounty } = getContext<IBountyStore>("bounty");
</script>

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
