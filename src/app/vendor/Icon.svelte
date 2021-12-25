<style>
    .icon-wrapper {
        position: relative;
    }

    .vendor-icon {
        height: 100px;
    }

    .progress-icon {
        position: absolute;
        height: 80px;
        left: 11px;
        top: 11px;
    }
</style>

<script lang="ts">
    import type { IVendorProgression } from "api/destiny2";
    import type { ITooltip } from "app/tooltip/Tooltip.types";
    import Tooltip from "../tooltip/Tooltip.svelte";

    export let vendorIcon: string | undefined = undefined;
    export let progressIcon: string | undefined = undefined;
    export let progression: IVendorProgression | undefined = undefined;

    const tooltipContent: ITooltip = {
        header: {
            title: progression?.name,
            subTitle: "Rank " + (progression?.level + 1), // plus 1 because in DTG the ranks start at 1
        },
        body: {
            description: progression?.description,
        },
    };
</script>

<Tooltip content={tooltipContent}>
    <div class="icon-wrapper">
        <img class="vendor-icon" src={vendorIcon} alt="vendor icon" />
        {#if vendorIcon != progressIcon && progressIcon}
            <img class="progress-icon" src={progressIcon} alt="progress icon" />
        {/if}
    </div>
</Tooltip>
