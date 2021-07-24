<style>
    .vendor {
        display: grid;
        column-gap: 20px;
        grid-template-columns: 100px 300px 50%;
        column-gap: 40px;
        margin: 20px 10px;
    }

    .vendor > .bounties {
        align-self: center;
    }

    .vendor > .description {
        align-self: center;
    }

    h3 {
        margin: 0;
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
            <img src={vendor.icon} alt="Vendor icon" />
        </div>
    {/if}

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
            <Bounty {bounty} />
        {/each}
    </div>
</div>
