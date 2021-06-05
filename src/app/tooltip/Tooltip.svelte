<style>
    .tooltip-wrapper {
        display: contents;
    }
    .tooltip {
        position: absolute;
        color: white;
        max-width: 400px;
        z-index: 100;
    }
    .header {
        background-color: #000000;
        opacity: 0.9;
        font-size: 25px;
        padding: 7px;
    }
    .header > .subtitle {
        font-size: 15px;
        font-weight: 600;
        color: #ffffffc2;
        padding-left: 3px;
    }
    .content {
        background-color: #000000;
        opacity: 0.7;
        padding: 7px;
    }
    .description {
        margin-bottom: 7px;
    }

</style>

<script lang="ts">
    import type { ITooltip } from "./Tooltip.types";
    import TooltipProgress from "./TooltipProgress.svelte";

    export let content: ITooltip;
    const { header, body } = content;

    let isHovered = false;
    let x;
    let y;

    const onMouseOver = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        isHovered = true;
        x = event.pageX;
        y = event.pageY;
    };
    const onMouseLeave = () => {
        isHovered = false;
    };
    const onMouseMove = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLSpanElement;
        }
    ) => {
        x = event.pageX;
        y = event.pageY;
    };

    const showBody = body.description || body.progress;

</script>

<div
    on:mouseover={onMouseOver}
    on:mouseleave={onMouseLeave}
    on:mousemove={onMouseMove}
    class="tooltip-wrapper"
>
    <slot />
</div>

{#if isHovered}
    <div style={`top: ${y}px; left: ${x + 30}px`} class="tooltip">
        <div class="header">
            {header.title}
            {#if header.subTitle}
                <div class="subtitle">
                    {header.subTitle}
                </div>
            {/if}
        </div>
        {#if showBody}
            <div class="content">
                {#if body.description}
                    <div class="description">
                        {body.description}
                    </div>
                {/if}
                {#if body.progress}
                    {#each body.progress as progress}
                        <TooltipProgress {progress} />
                    {/each}
                {/if}
            </div>
        {/if}
    </div>
{/if}
