<script lang="ts">
    import { getContext } from "svelte";
    import type { IBountyStore } from "api/utils";
    import type { IBounty } from "api/destiny2";
    import type { ICharacterContext } from "api/utils/types";
    import Bounty from "../vendor/Bounty.svelte";

    export let params: {
        membershipId: string;
        membershipType: string;
        characterId: string;
    };

    const { inventories } = getContext<ICharacterContext>("characters");
    let items: IBounty[] = [];
    $: items = $inventories[params.characterId];

    const { store, removeBounty } = getContext<IBountyStore>("bounty");

    const createActions = (bounty: IBounty) => [
        {
            text: "Untrack Bounty",
            action: () => removeBounty(bounty),
        },
    ];
</script>

<div class="overview_container">
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
                    <Bounty {bounty} actions={createActions(bounty)} />
                {/each}
            </div>
        {:else}
            <p>There are currently no bounties tracked</p>
        {/if}
    </div>
</div>

<style>
    .overview {
        box-sizing: border-box;
        padding: 10px;
        padding-top: 15px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
    }

    .bounties {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        min-height: 69px;
    }
</style>
