<style>
    .tooltip-wrapper {
        display: contents;
    }
</style>

<script lang="ts">
    import { getContext, onDestroy } from "svelte";
    import type { Writable } from "svelte/store";

    import type { ITooltip, ITooltipProps } from "./Tooltip.types";

    export let content: ITooltip;
    const tooltipContent = getContext<Writable<ITooltip>>("tooltip-content");

    const tooltipProps = getContext<Writable<ITooltipProps>>("tooltip");
    export let pressing: boolean = false;
    $: tooltipProps.update((tooltip) => {
        tooltip.pressing = pressing;
        return tooltip;
    });

    const onMouseOver = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        tooltipContent.set(content);
        tooltipProps.update((tooltip) => {
            tooltip.isHovered = true;
            return tooltip;
        });
        calculatePosition(event);
    };
    const onMouseLeave = () => {
        tooltipProps.update((tooltip) => {
            tooltip.isHovered = false;
            tooltip.x = 0;
            tooltip.y = 0;
            return tooltip;
        });
    };
    const onMouseMove = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        calculatePosition(event);
    };

    const calculatePosition = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        const { pageX, pageY } = event;
        const { innerWidth, innerHeight } = window;

        let x = 0;
        if (pageX + 430 > innerWidth) {
            x = pageX - 450;
        } else {
            x = pageX;
        }
        tooltipProps.update((tooltip) => {
            tooltip.x = x;
            tooltip.y = pageY;
            return tooltip;
        });
    };

    onDestroy(() => {
        tooltipProps.update((tooltip) => {
            tooltip.isHovered = false;
            return tooltip;
        });
    });
</script>

<div
    on:mouseover={onMouseOver}
    on:mouseleave={onMouseLeave}
    on:mousemove={onMouseMove}
    class="tooltip-wrapper"
>
    <slot />
</div>
