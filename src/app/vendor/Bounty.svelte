<style>
    .bounty {
        height: 69px;
        width: 69px;
        background-size: auto 100%;
    }

</style>

<script lang="ts">
    import type { IBounty } from "api/destiny2";
    import type { ITooltip, ITooltipProgress } from "app/tooltip/Tooltip.types";
    import Tooltip from "../tooltip/Tooltip.svelte";

    export let bounty: IBounty;

    const tooltipContent: ITooltip = {
        header: {
            title: bounty.displayProperties.name,
        },
        body: {
            description: bounty.displayProperties.description,
            progress: bounty.objectiveProgress.map<ITooltipProgress>((p) => ({
                progressValue: p.progress,
                completionValue: p.completionValue,
                description: p.objectiveProgressDescription,
            })),
        },
    };

</script>

<Tooltip content={tooltipContent}>
    <div
        class="bounty button"
        style={`background-image: url(${bounty.displayProperties.icon})`}
    />
</Tooltip>
