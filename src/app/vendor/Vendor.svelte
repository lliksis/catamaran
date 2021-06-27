<style>
    .vendor {
        display: grid;
        column-gap: 20px;
        grid-template-rows: auto auto;
        grid-template-columns: 100px auto;
    }

    .vendor > .bounties {
        align-self: center;
    }

    .vendor > .description {
        grid-column-start: 1;
        grid-column-end: 3;
    }
</style>

<script lang="ts">
    import type { IVendor } from "api/destiny2";
    import Progress from "./Progress.svelte";
    import Bounty from "./Bounty.svelte";

    export let vendor: IVendor;
</script>

<div class="vendor">
    {#if vendor.progression}
        <div class="progress">
            <Progress progression={vendor.progression} />
        </div>
    {:else}
        <div>
            <img src={vendor.icon} />
        </div>
    {/if}

    <div class="bounties">
        {#each vendor.bounties as bounty}
            <Bounty {bounty} />
        {/each}
    </div>

    <div class="description">
        <div>
            {vendor.name}
        </div>
        <div>
            {vendor.description}
        </div>
    </div>
</div>
