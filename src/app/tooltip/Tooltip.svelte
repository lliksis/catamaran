<style>
    .tooltip-wrapper {
        display: contents;
    }
    .tooltip {
        position: absolute;
        color: white;
        width: 400px;
        z-index: 100;
    }
    .header {
        background-color: #000000;
        font-size: 25px;
        padding: 7px;
    }
    .header > .subtitle {
        font-size: 15px;
        font-weight: 600;
        color: #ffffff;
        padding-left: 3px;
    }
    .content {
        background-color: #111111;
        opacity: 0.9;
        padding: 7px;
    }
    .description {
        margin-bottom: 7px;
    }
    .actions {
        background-color: #111111;
        border-top: 1px solid black;
        padding: 7px;
        text-align: end;
        height: 100%;
    }
    .action {
        height: 100%;
    }
    .action::before {
        content: var(--action-icon);
        display: inline-block;
        margin-right: 5px;
    }
</style>

<script lang="ts">
    import type { ITooltip } from "./Tooltip.types";
    import TooltipProgress from "./TooltipProgress.svelte";

    export let content: ITooltip;
    const { header, body, actions } = content;

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
        {#if actions}
            <div class="actions">
                {#each actions as action}
                    <div
                        class="action"
                        style={`--action-icon: "${action.icon}"`}
                    >
                        {action.description}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{/if}
