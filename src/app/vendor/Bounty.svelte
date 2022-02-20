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

<script lang="ts">
    import type { IBounty } from "api/destiny2";
    import type { ITooltip, ITooltipProgress } from "app/tooltip/Tooltip.types";
    import Tooltip from "../tooltip/Tooltip.svelte";
    import { clickAnywhereElse } from "api/utils/actions";
    import ContextMenu from "../ContextMenu/ContextMenu.svelte";

    export let bounty: IBounty;
    export let actionCallback: () => void | undefined = undefined;
    export let disabled: boolean = false;

    let showContextMenu = false;

    const onTrack = actionCallback ? actionCallback : undefined;

    $: menuItems = [
        {
            text: "Track Bounty",
            action: onTrack,
            disabled: disabled || !onTrack,
        },
    ];

    $: tooltipContent = {
        header: {
            title: bounty.displayProperties.name,
        },
        body: {
            error: disabled ? "Can only track one at a time" : undefined,
            description: bounty.displayProperties.description,
            progress: bounty.objectiveProgress.map<ITooltipProgress>((p) => ({
                progressValue: p.progress,
                completionValue: p.completionValue,
                description: p.objectiveProgressDescription,
            })),
        },
    } as ITooltip;

    const completed = bounty.objectiveProgress.reduce<boolean>(
        (_, progress) => {
            if (progress.completionValue === progress.progress) {
                return true;
            }
            return false;
        },
        false
    );
</script>

<div
    class="bounty-wrapper"
    on:contextmenu|preventDefault={() => {
        showContextMenu = true;
        return false;
    }}
    use:clickAnywhereElse
    on:outclick={() => (showContextMenu = false)}
>
    <ContextMenu show={showContextMenu} {menuItems} />
    <Tooltip content={tooltipContent}>
        <div
            class="bounty button unselectable"
            style={`background-image: url(${bounty.displayProperties.icon})`}
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
</div>
