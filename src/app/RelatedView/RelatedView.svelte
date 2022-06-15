<script lang="ts">
    import { slide } from "svelte/transition";
    import related from "api/utils/relatedStore";
    import Bounty from "app/vendor/Bounty.svelte";

    const { store, clearRelated } = related;
    $: relatedBounties = $store;
</script>

{#if relatedBounties.length > 0}
    <div in:slide out:slide class="container">
        <button on:click={clearRelated}>X</button>
        <div class="bounty_container">
            {#each relatedBounties as bounty}
                <Bounty {bounty} />
            {/each}
        </div>
    </div>
{/if}

<style>
    .bounty_container {
        padding: 10px;
        display: flex;
        flex-direction: row;
        gap: 7px;
    }
    button {
        all: unset;
        cursor: inherit;
        float: right;
        padding-right: 7px;
        color: rgba(255, 255, 255, 0.86);
    }
    button:hover {
        text-shadow: 0 0 2px;
    }
</style>
