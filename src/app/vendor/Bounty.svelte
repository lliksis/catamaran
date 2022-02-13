<style>
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
        filter: brightness(0.6);
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
    export let actionText: string | undefined = undefined;
    export let actionCallback: () => void | undefined = undefined;
    export let disabled: boolean = false;

    let pressing = false;
    const mouseDown = () => {
        pressing = true;
    };
    const mouseUp = () => {
        pressing = false;
    };
    const mouseLeave = mouseUp;
    const mouseOut = mouseUp;
    const blur = mouseUp;

    const tooltipActionCallback = actionCallback
        ? () => {
              actionCallback();
              pressing = false;
          }
        : undefined;

    $: tooltipContent = {
        header: {
            title: bounty.displayProperties.name,
        },
        body: {
            error: disabled ? "Can only hold one at a time" : undefined,
            description: bounty.displayProperties.description,
            progress: bounty.objectiveProgress.map<ITooltipProgress>((p) => ({
                progressValue: p.progress,
                completionValue: p.completionValue,
                description: p.objectiveProgressDescription,
            })),
        },
    } as ITooltip;

    $: if (!disabled && actionCallback) {
        tooltipContent.action = {
            description: actionText,
            completionTime: 1500,
            callback: tooltipActionCallback,
        };
    } else {
        tooltipContent.action = undefined;
    }

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

<Tooltip content={tooltipContent} {pressing}>
    <div
        class="bounty button unselectable"
        style={`background-image: url(${bounty.displayProperties.icon})`}
        class:completed
        class:disabled
        {disabled}
        aria-disabled={disabled}
        tabindex={0}
        on:mousedown={mouseDown}
        on:mouseup={mouseUp}
        on:mouseleave={mouseLeave}
        on:mouseout={mouseOut}
        on:blur={blur}
        on:touchstart={mouseDown}
        on:touchend={mouseUp}
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
