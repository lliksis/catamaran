<style>
    .bounty {
        display: inline-block;
        position: relative;
        height: 69px;
        width: 69px;
        background-size: auto 100%;
    }

    .completed::before {
        content: "";
        position: absolute;
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 4px solid #ffd13b;
    }

    svg {
        height: inherit;
        width: inherit;
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
        actions: [
            {
                description: "Hold to dismantle",
                icon: "\\e912",
            },
        ],
    };

    const completed = bounty.objectiveProgress.reduce<boolean>(
        (previous, progress) => {
            if (progress.completionValue === progress.progress) {
                return true;
            }
            return false;
        },
        false
    );
</script>

<Tooltip content={tooltipContent}>
    <div
        class="bounty button"
        style={`background-image: url(${bounty.displayProperties.icon})`}
        class:completed
    >
        {#if completed}
            <svg>
                <g>
                    <polygon points="69,69 34,69 69,34" style="fill: #ffd13b" />
                </g>
                <g>
                    <polygon
                        points="57,65 60,65 60,62 57,62"
                        style="fill: white"
                    />
                    <polygon
                        points="58,59 59,59 60,50 57,50"
                        style="fill: white"
                    />
                </g>
            </svg>
        {/if}
    </div>
</Tooltip>
