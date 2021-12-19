<style>
    .vendor {
        display: grid;
        column-gap: 20px;
        grid-template-columns: 100px 300px 50%;
        column-gap: 40px;
        margin-left: -8px;
        margin-right: -8px;
        padding: 20px 10px 20px 10px;
        background-color: var(--backgroundColor);
    }

    .vendor > .icon {
        align-self: center;
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
    import * as vendorConf from "../../vendorConf.json";
    import type { IVendor } from "api/destiny2";
    import Progress from "./Progress.svelte";
    import Bounty from "./Bounty.svelte";

    export let vendor: IVendor;

    const backgroundColor =
        vendorConf.vendorBackgrounds[vendor.vendorHash] || "grey";

    const optProgressIcon = vendorConf.vendorIconForProgress.includes(
        vendor.name
    )
        ? vendor.icon
        : undefined;
</script>

<div class="vendor" style="--backgroundColor: {backgroundColor}">
    <div class="icon">
        {#if vendor.progression}
            <Progress
                progression={vendor.progression}
                overrideIcon={optProgressIcon}
            />
        {:else}
            <img src={vendor.icon} alt="Vendor icon" />
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
            <Bounty {bounty} />
        {/each}
    </div>
</div>
