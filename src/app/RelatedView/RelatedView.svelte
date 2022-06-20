<script lang="ts">
    import { slide } from "svelte/transition";
    import related from "api/utils/relatedStore";
    import Bounty from "app/vendor/Bounty.svelte";
    import { getContext } from "svelte";
    import type { IBountyStore } from "api/utils";
    import type { IBounty } from "api/destiny2";

    const { store, clearRelated, selectedBounty } = related;
    $: relatedBounties = $store;

    const { addBounty } = getContext<IBountyStore>("bounty");
    const createActions = (bounty: IBounty) => [
        {
            text: "Track Bounty",
            action: () => addBounty(bounty),
        },
    ];
</script>

{#if relatedBounties.length > 0}
    <div in:slide out:slide class="container">
        <button on:click={clearRelated}>X</button>
        <div class="header">
            <img
                src={$selectedBounty.displayProperties.icon}
                alt={`Bounty icon of ${$selectedBounty.displayProperties.name}`}
                height="69px"
                width="69px"
            />
            <div>
                <h4>{$selectedBounty.displayProperties.name}</h4>
                {$selectedBounty.displayProperties.description}
            </div>
        </div>
        <hr size="0.5" />
        <div class="bounty_container">
            {#each relatedBounties as bounty}
                <Bounty {bounty} actions={createActions(bounty)} />
            {/each}
        </div>
    </div>
{/if}

<style>
    .header {
        display: flex;
        gap: 7px;
        margin: 10px;
    }
    .bounty_container {
        padding: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 7px;
    }
    h4 {
        margin-block-start: unset;
        margin-block-end: unset;
    }
    button {
        all: unset;
        cursor: inherit;
        position: absolute;
        right: 3px;
        padding-right: 7px;
        color: rgba(255, 255, 255, 0.86);
    }
    button:hover {
        text-shadow: 0 0 2px;
    }
    hr {
        margin-block-start: unset;
        margin-block-end: unset;
    }
</style>
