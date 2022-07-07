<script lang="ts">
    import { fade } from "svelte/transition";
    import type { IBounty } from "api/destiny2";
    import type { ITooltip, ITooltipProgress } from "app/tooltip/Tooltip.types";
    import Tooltip from "../tooltip/Tooltip.svelte";
    import ContextMenu from "../ContextMenu/ContextMenu.svelte";
    import { bountyProgress } from "api/destiny2/bounties";

    export let bounty: IBounty;
    export let actions: {
        text: string;
        action: () => void;
    }[] = undefined;
    export let disabled: boolean = false;

    $: tooltipContent = {
        header: {
            title: bounty.displayProperties.name,
        },
        body: {
            error: disabled ? "Can only track one at a time" : undefined,
            description: bounty.displayProperties.description,
            progress: bounty.objectiveProgress.map<ITooltipProgress>(
                (p, i) => ({
                    progressValue: bountyProgress.getProgress(i, bounty.hash),
                    completionValue: p.completionValue,
                    description: p.objectiveProgressDescription,
                })
            ),
        },
    } as ITooltip;

    const completed = bounty.objectiveProgress.reduce<boolean>(
        (_, progress, index) => {
            if (
                progress.completionValue ===
                bountyProgress.getProgress(index, bounty.hash)
            ) {
                return true;
            }
            return false;
        },
        false
    );
</script>

<div in:fade class="bounty-wrapper">
    <ContextMenu menuItems={actions} {disabled}>
        <Tooltip content={tooltipContent}>
            <div
                class="bounty button unselectable"
                style={`background-image: url(${bounty.displayProperties?.icon})`}
                class:completed
                class:disabled
                {disabled}
                aria-disabled={disabled}
                tabindex={0}
            >
                {#if completed}
                    <svg>
                        <g>
                            <polygon
                                points="69,69 34,69 69,34"
                                style="fill: #ffd13b"
                            />
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
    </ContextMenu>
</div>

<style>
    .bounty-wrapper {
        position: relative;
    }

    .bounty {
        display: inline-block;
        position: relative;
        height: 69px;
        width: 69px;
        background-size: auto 100%;
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5));
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

    .disabled {
        filter: brightness(0.6) drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5));
    }

    svg {
        height: inherit;
        width: inherit;
    }
</style>
